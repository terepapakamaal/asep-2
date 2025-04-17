import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const FileMaliciousChecker = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const checkFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
        headers: {
          'x-apikey': '9ea95a27237d6f9b5ac5a0549faf665a818150d1d8e66f497aaf6e1db357a7d4',
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data ? 'File is malicious' : 'File is safe');
    } catch {
      setResult('Error checking file. Fallback: Cannot determine.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>File Malicious Checker</Typography>
      <TextField
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={checkFile}>
        Check File
      </Button>
      {result && <Typography style={{ marginTop: '16px' }}>{result}</Typography>}
    </Container>
  );
};

export default FileMaliciousChecker;
