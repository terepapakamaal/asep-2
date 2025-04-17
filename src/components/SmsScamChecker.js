import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const SmsScamChecker = () => {
  const [sms, setSms] = useState('');
  const [result, setResult] = useState('');

  const scamKeywords = ['lottery', 'win', 'prize', 'urgent', 'free', 'click', 'link', 'bank'];

  const checkSms = () => {
    const isScam = scamKeywords.some(keyword => sms.toLowerCase().includes(keyword));
    setResult(isScam ? 'Scam SMS detected' : 'SMS seems safe');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>SMS Scam Checker</Typography>
      <TextField
        label="Enter SMS Text"
        variant="outlined"
        fullWidth
        value={sms}
        onChange={(e) => setSms(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={checkSms} style={{ marginTop: '16px' }}>
        Check SMS
      </Button>
      {result && <Typography style={{ marginTop: '16px' }}>{result}</Typography>}
    </Container>
  );
};

export default SmsScamChecker;