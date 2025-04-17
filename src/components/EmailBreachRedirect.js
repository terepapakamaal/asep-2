import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const EmailBreachRedirect = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Email Breach Information</Typography>
    <Typography>
      To check if your email has been breached, please visit the official{' '}
      <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer">
        Have I Been Pwned
      </a>{' '}
      website.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      href="https://haveibeenpwned.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginTop: '16px' }}
    >
      Go to Have I Been Pwned
    </Button>
  </Container>
);

export default EmailBreachRedirect;
