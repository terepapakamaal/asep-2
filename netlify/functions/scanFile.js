const axios = require('axios');
const FormData = require('form-data');

exports.handler = async (event) => {
  console.log('Function triggered');

  try {
    if (event.httpMethod !== 'POST') {
      console.log('Invalid HTTP Method:', event.httpMethod);
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    console.log('Parsing the file from the request...');

    // Decode the incoming form data
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType.includes('multipart/form-data')) {
      console.error('Invalid Content-Type:', contentType);
      return {
        statusCode: 400,
        body: 'Invalid Content-Type. Expected multipart/form-data.',
      };
    }

    // Parse the body into binary data
    const fileBuffer = Buffer.from(event.body, 'base64');

    // Prepare the file for VirusTotal
    const formData = new FormData();
    formData.append('file', fileBuffer, 'uploaded-file'); // Send the file as binary

    console.log('Sending file to VirusTotal...');
    const response = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
      headers: {
        ...formData.getHeaders(),
        'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Include your API key
      },
    });

    console.log('VirusTotal Response:', response.data);

    // Return the VirusTotal API response
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error communicating with VirusTotal:', error.message);
    console.error('Error details:', error.response?.data || error.stack);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error checking the file.',
        details: error.response?.data || error.message,
      }),
    };
  }
};
