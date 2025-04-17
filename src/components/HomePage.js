import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';

const HomePage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Welcome to the Security Tools</Typography>
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/url-checker">
          URL Safety Checker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/sms-checker">
          SMS Scam Detector
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/phone-checker">
          Phone Scam Checker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/password-checker">
          Password Checker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/file-checker">
          File Malicious Checker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" component={Link} to="/education">
          Learn About Scams
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" component={Link} to="/email-breach">
          Email Breach Check
        </Button>
      </Grid>
    </Grid>
  </Container>
);

export default HomePage;
