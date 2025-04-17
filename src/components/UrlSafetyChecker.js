import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const UrlSafetyChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const checkUrlSafety = async () => {
    try {
      const response = await axios.post('https://safebrowsing.googleapis.com/v4/threatMatches:find', {
        client: {
          clientId: "AIzaSyB7FssDf1KpaSTteYgwZ-gCW-8UhE4fESE",
          clientVersion: "1.0.0"
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["WINDOWS"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }]
        },
        key: "your-google-api-key"
      });
      setResult(response.data.matches ? 'Unsafe URL' : 'Safe URL');
    } catch (error) {
      setResult('Error checking the URL. Fallback: Assume Safe.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Safety Checker</Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={checkUrlSafety} style={{ marginTop: '16px' }}>
        Check URL
      </Button>
      {result && <Typography style={{ marginTop: '16px' }}>{result}</Typography>}
    </Container>
  );
};

export default UrlSafetyChecker;
