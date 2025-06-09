import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const UrlCheckerPage = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({ status: 'info', message: 'Enter a URL (e.g., https://example.com) to check its safety.' });

    const isValidUrl = (urlString) => {
        try {
            new URL(urlString);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleCheckUrl = async () => {
        if (!url.trim()) {
            setResult({ status: 'info', message: 'Please enter a URL.' });
            return;
        }

        if (!isValidUrl(url)) {
             setResult({ status: 'warning', message: 'Please enter a valid URL format (including http:// or https://).' });
            return;
        }


        setIsLoading(true);
        setResult({ status: 'info', message: 'Checking URL safety...' });

        try {
            // *** IMPORTANT ***
            // This assumes you have a backend endpoint '/api/check-url'
            // This endpoint should securely call the Google Safe Browsing API (or similar)
            // and return a standardized response like: { status: 'safe' | 'malicious' | 'unknown' | 'error', message: 'Details...' }
            const response = await axios.post('/api/check-url', { urlToCheck: url });

            // Assuming your backend returns data in the format { status: 'safe'/'warning'/'error', message: '...' }
            setResult({
                status: response.data.status || 'info', // Default to info if status is missing
                message: response.data.message || 'Check complete.'
            });

        } catch (error) {
            console.error("Error checking URL:", error);
            let errorMessage = 'Failed to check URL. The service might be unavailable, or the URL could be invalid.';
            if (error.response && error.response.data && error.response.data.message) {
                 errorMessage = `Error: ${error.response.data.message}`; // Use backend error message if available
            } else if (error.message) {
                errorMessage = `Network or request error: ${error.message}`;
            }
             setResult({
                status: 'error',
                message: errorMessage
             });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    URL Safety Checker
                </Typography>
                <Typography paragraph>
                    Enter a full website URL (e.g., https://www.google.com) to check if it's flagged as potentially malicious or unsafe using external databases (like Google Safe Browsing).
                </Typography>
                 <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                    <TextField
                        label="Website URL"
                        type="url"
                        fullWidth
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        margin="normal"
                        disabled={isLoading}
                        placeholder="https://example.com"
                    />
                   <Box sx={{ mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleCheckUrl}
                            disabled={isLoading || !url.trim()}
                            size="large"
                        >
                            Check URL Safety
                        </Button>
                        {isLoading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>

                 {result.message && (
                    <Alert severity={result.status} sx={{ mt: 3 }}>
                        {result.message}
                    </Alert>
                )}
                 <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center' }}>
                     Note: Safety checks rely on external services and may not catch all threats.
                 </Typography>
            </Paper>
        </Container>
    );
};

export default UrlCheckerPage;