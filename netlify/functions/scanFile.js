const axios = require('axios');

exports.handler = async (event) => {
  console.log('Function triggered');
  try {
    // Check if the method is POST
    if (event.httpMethod !== 'POST') {
      console.log('Invalid HTTP Method:', event.httpMethod);
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    // Log the event body
    console.log('Event body:', event.body);

    // Parse the incoming file buffer from the request
    const fileBuffer = Buffer.from(event.body, 'base64');

    // Ensure the environment variable is set
    if (!process.env.VIRUSTOTAL_API_KEY) {
      console.error('Missing VirusTotal API Key');
      return {
        statusCode: 500,
        body: 'Server configuration error: Missing API Key',
      };
    }

    // Send the file to the VirusTotal API
    console.log('Sending file to VirusTotal...');
    const response = await axios.post('https://www.virustotal.com/api/v3/files', fileBuffer, {
      headers: {
        'x-apikey': process.env.VIRUSTOTAL_API_KEY,
        'Content-Type': 'application/octet-stream',
      },
    });

    // Log the VirusTotal API response
    console.log('VirusTotal API Response:', response.data);

    // Return the VirusTotal API response to the client
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
