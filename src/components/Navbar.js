import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Security Tools
      </Typography>
      <Box>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/url-checker">URL Checker</Button>
        <Button color="inherit" component={Link} to="/sms-checker">SMS Checker</Button>
        <Button color="inherit" component={Link} to="/phone-checker">Phone Checker</Button>
        <Button color="inherit" component={Link} to="/password-checker">Password Checker</Button>
        <Button color="inherit" component={Link} to="/file-checker">File Checker</Button>
        <Button color="inherit" component={Link} to="/education">Education</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
