import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';

const FileCheckerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export default function FileCheckerPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult(null);
    setError('');

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (url) {
      formData.append('url', url);
    } else {
      setError('Please upload a file or enter a URL.');
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
        setError('File not found or URL not scanned yet.');
      }
    } catch (err) {
      setError('Error checking the file or URL. Please try again.');
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
          Check File for Malware
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {result && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {JSON.stringify(result, null, 2)}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <input type="file" onChange={handleFileChange} />
          <TextField
            margin="normal"
            fullWidth
            label="File URL"
            value={url}
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