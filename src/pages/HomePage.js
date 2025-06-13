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

// Added for Panic Button and Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link'; // For external links in Dialog
import Alert from '@mui/material/Alert';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PhoneIcon from '@mui/icons-material/Phone'; // For helpline
import LanguageIcon from '@mui/icons-material/Language'; // For website link
import WifiOffIcon from '@mui/icons-material/WifiOff';
import BlockIcon from '@mui/icons-material/Block';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';

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
  const [openPanicDialog, setOpenPanicDialog] = React.useState(false);

  const handlePanicOpen = () => {
    setOpenPanicDialog(true);
  };

  const handlePanicClose = () => {
    setOpenPanicDialog(false);
  };

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

      {/* Panic Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          color="error" // Make it stand out
          size="large"
          startIcon={<ReportProblemIcon />}
          onClick={handlePanicOpen}
          sx={{ py: 1.5, px: 3, fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          PANIC BUTTON: Under Attack?
        </Button>
      </Box>

      {/* Panic Dialog */}
      <Dialog open={openPanicDialog} onClose={handlePanicClose} aria-labelledby="panic-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="panic-dialog-title" sx={{ bgcolor: 'error.dark', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReportProblemIcon sx={{ mr: 1 }} />
            Immediate Actions: Scam/Phishing Attack
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText component="div" sx={{ mb: 2, color: 'text.primary' }}>
            If you believe you are actively being scammed or have just been scammed, take these steps immediately:
          </DialogContentText>
          <List dense sx={{ '& .MuiListItemIcon-root': { minWidth: 40 }}}>
            <ListItem>
              <ListItemIcon><WifiOffIcon color="error" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="Disconnect from Internet:" secondary="If you suspect remote access or ongoing data theft, disconnect your device from Wi-Fi / Mobile Data." />
            </ListItem>
            <ListItem>
              <ListItemIcon><BlockIcon color="error" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="Stop Communication:" secondary="Do NOT provide any more personal information or money. End contact with the scammer." />
            </ListItem>
            <ListItem>
              <ListItemIcon><AccountBalanceIcon color="error" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="Contact Your Bank(s) IMMEDIATELY:" secondary="If financial details (card, UPI, net banking) were shared or unauthorized transactions occurred. Inform them about the fraud." />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 2.5, mb: 1, color: 'primary.main' }}>Report the Incident:</Typography>
          <List dense sx={{ '& .MuiListItemIcon-root': { minWidth: 40 }}}>
            <ListItem>
              <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="National Cyber Crime Helpline:" secondary={<Typography component="strong" color="primary.dark" sx={{fontSize: '1.1rem'}}>Call 1930</Typography>} />
            </ListItem>
            <ListItem>
              <ListItemIcon><LanguageIcon color="primary" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="Report Online:" secondary={<Link href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" sx={{fontWeight:'medium'}}>https://cybercrime.gov.in</Link>} />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 2.5, mb: 1, color: 'action.active' }}>Gather Information (If Safe):</Typography>
          <List dense sx={{ '& .MuiListItemIcon-root': { minWidth: 40 }}}>
            <ListItem>
              <ListItemIcon><ScreenshotMonitorIcon color="action" /></ListItemIcon>
              <ListItemText primaryTypographyProps={{fontWeight: 'medium'}} primary="Collect Evidence:" secondary="Take screenshots of scam messages, websites, payment details, and note down scammer's contact info (phone, email, UPI ID)." />
            </ListItem>
          </List>
           <Alert severity="warning" sx={{ mt: 2.5 }}>
            <strong>Disclaimer:</strong> This information is for guidance. Always prioritize your safety. Official authorities can provide the most accurate and timely help.
          </Alert>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handlePanicClose} color="primary" variant="contained" size="large">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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