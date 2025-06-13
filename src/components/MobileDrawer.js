import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LinkIcon from '@mui/icons-material/Link';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email'; // For Email Breach
import DescriptionIcon from '@mui/icons-material/Description'; // Ensure icon is imported
import { Link as RouterLink } from 'react-router-dom';

const MobileDrawer = ({ open, onClose }) => {

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'SMS Checker', icon: <SmsIcon />, path: '/sms-checker' },
        { text: 'Phone Checker', icon: <PhoneAndroidIcon />, path: '/phone-checker' },
        { text: 'URL Checker', icon: <LinkIcon />, path: '/url-checker' },
        { text: 'File Checker', icon: <DescriptionIcon />, path: '/file-checker' }, // <-- Add File Checker
        { text: 'Password Guide', icon: <VpnKeyIcon />, path: '/password-guide' },
        { text: 'Education', icon: <SchoolIcon />, path: '/education' },
    ];

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onClose} // Close drawer when clicking inside
            onKeyDown={onClose} // Close drawer on escape key etc.
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* Email Breach Redirect Link for Mobile Drawer */}
            <Box sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<EmailIcon />}
                    fullWidth
                    href="https://haveibeenpwned.com/"
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer" // Security best practice
                >
                    Check Email Breach
                </Button>
            </Box>
        </Box>
    );

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            {DrawerList}
        </Drawer>
    );
};

export default MobileDrawer;