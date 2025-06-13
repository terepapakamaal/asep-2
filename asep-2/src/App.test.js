import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../components/AuthContext';

const FileCheckerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const FileCheckerPage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setFileUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (fileUrl) {
      formData.append('url', fileUrl);
    } else {
      setError('Please upload a file or enter a file URL.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://www.virustotal.com/vtapi/v2/file/report', {
        method: 'POST',
        body: formData,
        headers: {
          'x-apikey': 'YOUR_API_KEY', // Replace with your VirusTotal API key
        },
      });

      const data = await response.json();
      if (data.response_code === 1) {
        setResult(data);
      } else {
        setError('File not found or an error occurred.');
      }
    } catch (err) {
      setError('An error occurred while checking the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FileCheckerContainer>
      <Card sx={{ p: 4, m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mt: 8 }}>
        <Typography component="h1" variant="h5">
          Check File for Malware
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {result && <Alert severity="success" sx={{ mt: 2 }}>File Status: {result.positives} out of {result.total} engines detected this file as malicious.</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            type="file"
            onChange={handleFileChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="File URL"
            value={fileUrl}
            onChange={handleUrlChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check File'}
          </Button>
        </Box>
      </Card>
    </FileCheckerContainer>
  );
};

export default FileCheckerPage;