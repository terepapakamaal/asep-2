import React, { useState } from 'react'; // Corrected: useState from 'react'
import { Box, Button, Typography, Container, Paper, CircularProgress, Alert, LinearProgress, List, ListItem, ListItemText } from '@mui/material'; // Added List, ListItem, ListItemText
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VIRUSTOTAL_API_KEY = '9ea95a27237d6f9b5ac5a0549faf665a818150d1d8e66f497aaf6e1db357a7d4'; // WARNING: Exposing API keys in frontend is insecure
const VIRUSTOTAL_API_URL_FILE_SCAN = 'https://www.virustotal.com/api/v3/files';
// Note: VirusTotal's public API has rate limits (e.g., 4 requests per minute).

export default function FileCheckerPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [analysisId, setAnalysisId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setScanResult(null);
    setError('');
    setAnalysisId(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to scan.');
      return;
    }

    setIsLoading(true);
    setError('');
    setScanResult(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Step 1: Upload the file to get an analysis ID
      const uploadResponse = await axios.post(VIRUSTOTAL_API_URL_FILE_SCAN, formData, {
        headers: {
          'x-apikey': VIRUSTOTAL_API_KEY,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      const newAnalysisId = uploadResponse.data?.data?.id;
      if (!newAnalysisId) {
        throw new Error('Failed to get analysis ID from VirusTotal.');
      }
      setAnalysisId(newAnalysisId);
      setUploadProgress(100); // Mark upload as complete
      setIsLoading(false); // Stop initial loading, start polling
      pollForResults(newAnalysisId);

    } catch (err) {
      console.error('Error scanning file:', err.response?.data || err.message);
      setError(err.response?.data?.error?.message || 'Failed to scan file. Check console for details.');
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const pollForResults = async (id) => {
    setIsPolling(true);
    setError('');
    setScanResult(null); // Clear previous results before polling

    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${id}`;
    let attempts = 0;
    const maxAttempts = 20; // Poll for roughly 2 minutes (20 * 6s)
    const interval = 6000; // 6 seconds

    const intervalId = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(intervalId);
        setError('Scan timed out. The file might be too large or the queue is long. You can check the report later on VirusTotal using the Analysis ID.');
        setIsPolling(false);
        return;
      }

      try {
        const reportResponse = await axios.get(analysisUrl, {
          headers: { 'x-apikey': VIRUSTOTAL_API_KEY },
        });

        const reportData = reportResponse.data?.data;

        if (reportData?.attributes?.status === 'completed') {
          clearInterval(intervalId);
          setScanResult(reportData.attributes.results);
          // You might want to fetch the full file report using reportData.meta.file_info.sha256
          // For simplicity, we are using the analysis results here.
          setIsPolling(false);
        } else if (reportData?.attributes?.status === 'queued' || reportData?.attributes?.status === 'in-progress') {
          // Still processing, continue polling
          setError(`Scan status: ${reportData.attributes.status}. Please wait... (Attempt ${attempts}/${maxAttempts})`);
        } else {
            clearInterval(intervalId);
            setError(`Scan failed or has an unexpected status: ${reportData?.attributes?.status || 'Unknown'}`);
            setIsPolling(false);
        }
      } catch (err) {
        console.error('Error polling for results:', err.response?.data || err.message);
        // Don't stop polling on transient network errors, but maybe after a few failed attempts
        setError('Error fetching scan report. Retrying...');
        // If it's a 404, the analysis ID might be wrong or expired
        if (err.response?.status === 404) {
            clearInterval(intervalId);
            setError('Analysis ID not found. The scan may have failed or the ID is incorrect.');
            setIsPolling(false);
        }
      }
    }, interval);
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom component="h1">
          Malicious File Checker
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Upload a file to scan it for malware using VirusTotal. Public API has rate limits.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {selectedFile && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Selected file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isPolling || !selectedFile}
            fullWidth
            sx={{ mb: 2 }}
          >
            {isLoading ? 'Uploading...' : isPolling ? 'Analyzing...' : 'Scan File'}
          </Button>
        </Box>

        {(isLoading || (isPolling && !scanResult)) && uploadProgress > 0 && uploadProgress < 100 && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="caption">Uploading: {uploadProgress}%</Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
        {isPolling && !scanResult && (
             <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, flexDirection: 'column' }}>
                <CircularProgress sx={{mr: 2}} />
                <Typography>Analyzing file, please wait...</Typography>
            </Box>
        )}


        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {analysisId && !isPolling && !scanResult && !error && (
            <Alert severity="info" sx={{mt: 2}}>
                File uploaded. Analysis ID: {analysisId}. If results don't appear, you can check on VirusTotal later.
            </Alert>
        )}

        {scanResult && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Scan Report
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">
                Detections:
                {` ${Object.values(scanResult).filter(r => r.category === 'malicious').length} / ${Object.keys(scanResult).length}`}
              </Typography>
              <List dense>
                {Object.entries(scanResult).map(([engine, result]) => (
                  <ListItem key={engine} sx={{bgcolor: result.category === 'malicious' ? 'error.light' : result.category === 'suspicious' ? 'warning.light' : 'transparent', mb: 0.5, borderRadius: 1}}>
                    <ListItemText
                      primary={engine}
                      secondary={result.result ? `Detected: ${result.result}` : `Status: ${result.category}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

