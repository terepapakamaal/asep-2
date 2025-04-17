import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const PhoneScamChecker = () => {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState('');

  const checkPhone = () => {
    // Placeholder logic
    setResult(phone.startsWith('1800') ? 'Potential scam number' : 'Number seems safe');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Phone Scam Checker</Typography>
      <TextField
        label="Enter Phone Number"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={checkPhone} style={{ marginTop: '16px' }}>
        Check Number
      </Button>
      {result && <Typography style={{ marginTop: '16px' }}>{result}</Typography>}
    </Container>
  );
};

export default PhoneScamChecker;