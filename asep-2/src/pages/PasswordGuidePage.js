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
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://www.virustotal.com/vtapi/v2/file/report', {
        method: 'POST',
        headers: {
          'x-apikey': 'YOUR_API_KEY', // Replace with your VirusTotal API key
        },
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error fetching data from VirusTotal.');
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
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Scan Results:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <input type="file" onChange={handleFileChange} />
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
};

export default FileCheckerPage;