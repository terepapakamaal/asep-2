import React, { useState } from 'react';
import axios from 'axios';

const FileMaliciousChecker = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const checkFile = async () => {
    if (!file) {
      setResult('Please select a file to check.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        '/.netlify/functions/scanFile', // Netlify function endpoint
        formData, // Send the file using FormData
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure proper content type
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

  return (
    <div>
      <h2>File Malicious Checker</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={checkFile}>Check File</button>
      <p>{result}</p>
    </div>
  );
};

export default FileMaliciousChecker;
