import React from 'react';
import { Container, Typography, Paper, Grid, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DescriptionIcon from '@mui/icons-material/Description';
/* import LockIcon from '@mui/icons-material/Lock'; */
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const features = [
  {
    title: 'SMS Checker',
    description: 'Analyze SMS messages for potential phishing attempts or scams.',
    icon: <SmsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/sms-checker',
  },
  {
    title: 'Phone Number Checker',
    description: 'Check phone numbers against known spam databases.',
    icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/phone-checker',
  },
  {
    title: 'URL Checker',
    description: 'Verify URLs for safety and malicious content.',
    icon: <LinkOffIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/url-checker',
  },
  {
    title: 'File Checker',
    description: 'Scan files for viruses and malware.',
    icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/file-checker',
  },
  {
    title: 'Password Guide',
    description: 'Learn how to create and manage strong passwords.',
    icon: <VpnKeyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/password-guide',
  },
  {
    title: 'Cybersecurity Education',
    description: 'Educational resources to enhance your cyber awareness.',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    path: '/education',
  },
];

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
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to={feature.path}
              startIcon={feature.icon}
            >
              {feature.title}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
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