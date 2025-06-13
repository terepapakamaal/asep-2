import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const FileCheckerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const FileCheckerPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    if (!file) {
      setError('Please select a file to upload.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://www.virustotal.com/vtapi/v2/file/scan', {
        method: 'POST',
        body: formData,
        headers: {
          'x-apikey': 'YOUR_VIRUSTOTAL_API_KEY', // Replace with your VirusTotal API key
        },
      });

      const data = await response.json();
      if (data.response_code === 1) {
        setResult(data);
      } else {
        setError('Error scanning the file. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while scanning the file.');
    } finally {
      setLoading(false);
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
        {result && <Alert severity="success" sx={{ mt: 2 }}>File scanned successfully!</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <input
            accept="*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Upload File
            </Button>
          </label>
          {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}
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