import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom'; 
import SecurityIcon from '@mui/icons-material/Security'; 

const Navbar = ({ isMobile, onMenuClick }) => {
    const theme = useTheme();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'SMS Check', path: '/sms-checker' },
        { label: 'Phone Check', path: '/phone-checker' },
        { label: 'URL Check', path: '/url-checker' },
        // { label: 'File Check', path: '/file-checker' }, // Uncomment when ready
        { label: 'Passwords', path: '/password-guide' },
        { label: 'Education', path: '/education' },
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
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                color="inherit"
                                component={RouterLink}
                                to={item.path}
                                sx={{ ml: 1 }}
                            >
                                {item.label}
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