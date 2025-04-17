const checkFile = async () => {
  if (!file) {
    setResult('Please select a file to check.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async (e) => {
    const fileData = e.target.result.split(',')[1]; // Get base64 data of the file

    try {
      const response = await axios.post(
        '/.netlify/functions/scanFile', // Netlify function endpoint
        fileData,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      console.log('Serverless function response:', response.data);

      // Check if the file is malicious
      const isMalicious = response.data.data ? 'File is malicious' : 'File is safe';
      setResult(isMalicious);
    } catch (error) {
      console.error('Error checking file:', error.response || error.message);
      setResult('Error checking file. Fallback: Cannot determine.');
    }
  };

  reader.readAsDataURL(file); // Convert file to base64
};
