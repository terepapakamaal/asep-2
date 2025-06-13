import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom'; 
import SecurityIcon from '@mui/icons-material/Security'; 
import DescriptionIcon from '@mui/icons-material/Description'; // Example icon for File Checker
import HomeIcon from '@mui/icons-material/Home'; // <-- Add this
import SmsIcon from '@mui/icons-material/Sms'; // <-- Add this
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'; // <-- Add this
import LinkIcon from '@mui/icons-material/Link'; // <-- Add this
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // <-- Add this
import SchoolIcon from '@mui/icons-material/School'; // <-- Add this

const Navbar = ({ isMobile, onMenuClick }) => {
    const theme = useTheme();

    const pages = [
        { name: 'Home', path: '/', icon: <HomeIcon /> },
        { name: 'SMS Checker', path: '/sms-checker', icon: <SmsIcon /> },
        { name: 'Phone Checker', path: '/phone-checker', icon: <PhoneAndroidIcon /> },
        { name: 'URL Checker', path: '/url-checker', icon: <LinkIcon /> },
        { name: 'File Checker', path: '/file-checker', icon: <DescriptionIcon /> }, // <-- Add File Checker
        { name: 'Password Guide', path: '/password-guide', icon: <VpnKeyIcon /> },
        { name: 'Education', path: '/education', icon: <SchoolIcon /> },
    ];

    return (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}> {/* Ensure Navbar is above drawer */}
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Secure Shield
                </Typography>
                {!isMobile && (
                    <Box>
                        {pages.map((item) => (
                            <Button
                                key={item.name}
                                color="inherit"
                                component={RouterLink}
                                to={item.path}
                                sx={{ ml: 1 }}
                            >
                                {item.name}
                            </Button>
                        ))}
                        {/* Email Breach Redirect Link for Desktop Navbar */}
                        <Button
                            color="inherit"
                            href="https://haveibeenpwned.com/"
                            target="_blank" // Open in new tab
                            rel="noopener noreferrer" // Security best practice
                            sx={{ ml: 1 }}
                        >
                            Check Email Breach
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;