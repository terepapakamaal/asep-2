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
        setResult(response.data ? 'File is malicious' : 'File is safe');
      } catch (error) {
        console.error('Error checking file:', error.response || error.message);
        setResult('Error checking file. Fallback: Cannot determine.');
      }
    };

    reader.readAsDataURL(file); // Convert file to base64
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
