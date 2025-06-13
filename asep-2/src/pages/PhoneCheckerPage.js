import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CssBaseline, Typography, TextField, Alert } from '@mui/material';
import axios from 'axios';

const FileCheckerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export default function FileCheckerPage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setFileUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setScanResult(null);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (fileUrl) {
      formData.append('url', fileUrl);
    } else {
      setError('Please upload a file or enter a file URL.');
      return;
    }

    try {
      const response = await axios.post('https://www.virustotal.com/vtapi/v2/file/report', formData, {
        params: {
          apikey: 'YOUR_VIRUSTOTAL_API_KEY', // Replace with your VirusTotal API key
        },
      });
      setScanResult(response.data);
    } catch (err) {
      setError('Error checking the file. Please try again.');
    }
  };

  return (
    <FileCheckerContainer>
      <CssBaseline />
      <Card
        sx={{
          p: 4,
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          File Checker
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {scanResult && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {JSON.stringify(scanResult, null, 2)}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <input type="file" onChange={handleFileChange} />
          <TextField
            margin="normal"
            fullWidth
            label="File URL"
            value={fileUrl}
            onChange={handleUrlChange}
            placeholder="Enter file URL"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Check File
          </Button>
        </Box>
      </Card>
    </FileCheckerContainer>
  );
}