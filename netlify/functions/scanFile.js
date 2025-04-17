const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Check if the method is POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    // Parse the incoming file from the request
    const fileBuffer = Buffer.from(event.body, 'base64');

    // Send the file to the VirusTotal API
    const response = await axios.post('https://www.virustotal.com/api/v3/files', fileBuffer, {
      headers: {
        'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Securely store your API key in environment variables
        'Content-Type': 'application/octet-stream',
      },
    });

    // Return the VirusTotal API response
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error communicating with VirusTotal:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error checking the file.',
        details: error.response ? error.response.data : error.message,
      }),
    };
  }
};
