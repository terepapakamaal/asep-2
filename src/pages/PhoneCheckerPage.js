import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

// Example list of suspicious prefixes (Needs research for India context)
// E.g., International prefixes often used in scams, specific known scam ranges.
const SUSPICIOUS_PREFIXES = [
    '+1800', // Example common toll-free often spoofed
    '+44', // Example international frequently used
    '+92', // Example regional neighbor often involved in specific scams
    // Add known Indian premium rate numbers or specific scam prefixes here
    // e.g., '140' for telemarketers (though not always scams)
];

const PhoneCheckerPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({ status: 'info', message: 'Enter a phone number to check.' });

    const handleCheckPhone = () => {
        const cleanedNumber = phoneNumber.replace(/[\s\-()]/g, ''); // Remove spaces, hyphens, parentheses

        if (!cleanedNumber) {
            setResult({ status: 'info', message: 'Please enter a phone number.' });
            return;
        }

        // Basic validation (optional) - check if it looks somewhat like a phone number
        if (!/^\+?[0-9]{7,}$/.test(cleanedNumber)) {
             setResult({ status: 'info', message: 'Please enter a valid phone number format (e.g., +91XXXXXXXXXX or XXXXXXXXXX).' });
            return;
        }


        setIsLoading(true);
        setResult({ status: 'info', message: 'Checking...' });

        setTimeout(() => {
            let isSuspicious = false;
            let foundPrefix = null;

            for (const prefix of SUSPICIOUS_PREFIXES) {
                if (cleanedNumber.startsWith(prefix)) {
                    isSuspicious = true;
                    foundPrefix = prefix;
                    break;
                }
            }

            if (isSuspicious) {
                setResult({
                    status: 'warning',
                    message: `Potential risk: The number starts with '${foundPrefix}'. This prefix is sometimes associated with scams. Investigate further before trusting.`
                });
            } else {
                 setResult({
                    status: 'safe',
                    message: 'This number prefix is not on our basic suspicious list. However, always exercise caution.'
                });
            }
            setIsLoading(false);
        }, 500); // Simulate check time
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Phone Scam Checker
                </Typography>
                <Typography paragraph>
                    Enter a phone number (including country code if applicable) to check against a basic list of known suspicious prefixes. This is not a comprehensive check.
                </Typography>
                 <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                    <TextField
                        label="Phone Number"
                        type="tel" // Suggests telephone input type
                        fullWidth
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        disabled={isLoading}
                        placeholder="+91XXXXXXXXXX or 0XXXXXXXXXX"
                    />
                    <Box sx={{ mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleCheckPhone}
                            disabled={isLoading || !phoneNumber.trim()}
                            size="large"
                        >
                            Check Phone Number
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

export default PhoneCheckerPage;