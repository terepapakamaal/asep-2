import React from 'react';
import { Container, Typography, Paper, Grid, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DescriptionIcon from '@mui/icons-material/Description';
import LockIcon from '@mui/icons-material/Lock';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <ShieldIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Stay Safe Online in India
        </Typography>
        <Typography variant="h6" component="p">
          Your guide to identifying and avoiding common online scams, plus tools to help you check for risks.
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        Our Tools & Resources
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Tool Links */}
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/sms-checker" startIcon={<PhoneAndroidIcon />}>
            Check Suspicious SMS
          </Button>
        </Grid>
         <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/phone-checker" startIcon={<PhoneAndroidIcon />}>
            Check Scam Phone Numbers
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/url-checker" startIcon={<LinkOffIcon />}>
            Check Website Safety (URL)
          </Button>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/file-checker" startIcon={<DescriptionIcon />}>
            Check File Safety
          </Button>
        </Grid> */}

        {/* Resource Links */}
         <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/password-guide" startIcon={<LockIcon />}>
            Strong Password Guide
          </Button>
        </Grid>
         <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth component={RouterLink} to="/education" startIcon={<SchoolIcon />}>
            Learn About Scams
          </Button>
        </Grid>
         <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained" // Make it stand out slightly
            color="secondary"
            fullWidth
            href="https://haveibeenpwned.com/"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<EmailIcon />}
          >
            Check Email Breach (External)
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>About This Project</Typography>
          <Typography paragraph>
              Online scams are a growing problem in India. This website aims to empower users by providing simple tools to check potentially risky messages, numbers, links, and files.
          </Typography>
           <Typography paragraph>
              We also provide educational resources to help you recognize common scam tactics and adopt safer online habits like using strong, unique passwords and enabling Two-Factor Authentication (2FA).
          </Typography>
           <Typography>
              Our goal is to create a more informed and resilient online community in India. Stay vigilant and stay safe!
          </Typography>
      </Box>

    </Container>
  );
};

export default HomePage;