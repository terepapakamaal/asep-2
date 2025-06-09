import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkIcon from '@mui/icons-material/Link';
import PasswordIcon from '@mui/icons-material/Password';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email'; // For Email Breach
import { Link as RouterLink } from 'react-router-dom';

const MobileDrawer = ({ open, onClose }) => {

    const drawerItems = [
        { text: 'Home', path: '/', icon: <HomeIcon /> },
        { text: 'SMS Check', path: '/sms-checker', icon: <SmsIcon /> },
        { text: 'Phone Check', path: '/phone-checker', icon: <PhoneIcon /> },
        { text: 'URL Check', path: '/url-checker', icon: <LinkIcon /> },
        // { text: 'File Check', path: '/file-checker', icon: <FolderZipIcon /> }, // Uncomment later
        { text: 'Password Guide', path: '/password-guide', icon: <PasswordIcon /> },
        { text: 'Education', path: '/education', icon: <SchoolIcon /> },
    ];

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onClose} // Close drawer when clicking inside
            onKeyDown={onClose} // Close drawer on escape key etc.
        >
            <List>
                {drawerItems.map((item) => (
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