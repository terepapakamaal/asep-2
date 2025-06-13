import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

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
      const response = await axios.post('https://www.virustotal.com/vtapi/v2/file/report', formData, {
        params: {
          apikey: 'YOUR_VIRUSTOTAL_API_KEY',
        },
      });
      setResult(response.data);
    } catch (err) {
      setError('Error checking the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FileCheckerContainer>
      <Card sx={{ p: 4, m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mt: 8 }}>
        <Typography component="h1" variant="h5">
          File Checker
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <input type="file" onChange={handleFileChange} />
          <TextField
            margin="normal"
            fullWidth
            label="File URL"
            value={fileUrl}
            onChange={handleUrlChange}
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Check File
          </Button>
          {loading && <CircularProgress />}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {result && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {JSON.stringify(result, null, 2)}
            </Alert>
          )}
        </Box>
      </Card>
    </FileCheckerContainer>
  );
};

export default FileCheckerPage;