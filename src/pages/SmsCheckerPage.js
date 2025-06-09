import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';


const SCAM_KEYWORDS = [
    'congratulations', 'won', 'prize', 'lottery', 'claim', 'free', 'gift', 'urgent',
    'verify', 'account', 'suspended', 'password', 'click here', 'limited time',
    'irs', 'tax refund', 'bank', 'update', 'confirm', 'winner', 'selected', 'cash',
    'customer service', 'action required', 'dear user'
];

const SmsCheckerPage = () => {
    const [smsText, setSmsText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({ status: 'info', message: 'Enter SMS text to check.' }); // status: info, safe, warning, error

    const handleCheckSms = () => {
        if (!smsText.trim()) {
            setResult({ status: 'info', message: 'Please enter the SMS text first.' });
            return;
        }

        setIsLoading(true);
        setResult({ status: 'info', message: 'Checking...' });

        // Simulate network delay/processing time
        setTimeout(() => {
            const textLower = smsText.toLowerCase();
            let foundKeywords = [];

            SCAM_KEYWORDS.forEach(keyword => {
                // Use word boundary check (\b) to avoid partial matches (e.g., 'won' in 'wonderful')
                const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // 'i' for case-insensitive
                if (regex.test(textLower)) {
                    foundKeywords.push(keyword);
                }
            });

            if (foundKeywords.length > 0) {
                setResult({
                    status: 'warning',
                    message: `Potential risk detected! Found keywords: ${foundKeywords.join(', ')}. Be cautious with this message.`
                });
            } else {
                setResult({
                    status: 'safe',
                    message: 'No common scam keywords detected. However, always remain vigilant.'
                });
            }
            setIsLoading(false);
        }, 500); // Simulate 0.5 second delay to look as something is going
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    SMS Scam Checker
                </Typography>
                <Typography paragraph>
                    Paste the suspicious SMS message below to check for common scam keywords. This is a basic check and not foolproof.
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                    <TextField
                        label="SMS Message Text"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={smsText}
                        onChange={(e) => setSmsText(e.target.value)}
                        margin="normal"
                        disabled={isLoading}
                    />
                    <Box sx={{ mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleCheckSms}
                            disabled={isLoading || !smsText.trim()}
                            size="large"
                        >
                            Check SMS
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
            </Paper>
        </Container>
    );
};

export default SmsCheckerPage;