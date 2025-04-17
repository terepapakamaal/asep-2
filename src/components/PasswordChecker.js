import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const checkPasswordStrength = () => {
    const isStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);
    setResult(isStrong ? 'Strong Password' : 'Weak Password');
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let generated = '';
    for (let i = 0; i < 12; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(generated);
  };

  const checkEmailBreach = async (email) => {
    try {
      const response = await axios.get(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
        {
          headers: { 'hibp-api-key': 'your-hibp-api-key' },
        }
      );
      setResult(response.data.length ? 'Email has been breached' : 'Email is safe');
    } catch {
      setResult('Error checking email breach. Fallback: Cannot determine.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Password Checker</Typography>
      <TextField
        label="Enter Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={checkPasswordStrength} style={{ marginTop: '16px' }}>
        Check Strength
      </Button>
      <Button variant="contained" color="secondary" onClick={generatePassword} style={{ marginTop: '16px' }}>
        Generate Password
      </Button>
      {result && <Typography style={{ marginTop: '16px' }}>{result}</Typography>}
      {generatedPassword && (
        <Typography style={{ marginTop: '16px' }}>Generated Password: {generatedPassword}</Typography>
      )}
    </Container>
  );
};

export default PasswordChecker;