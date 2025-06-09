import React, { useState, useEffect } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkIcon from '@mui/icons-material/Link';
// import FolderZipIcon from '@mui/icons-material/FolderZip'; // For File Check
import SchoolIcon from '@mui/icons-material/School'; // For Education
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname); // Sync with current route

    // Update value when route changes
    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue); // Navigate on click
    };

    // Filter out paths that might not fit well or map them differently if needed
    const navActions = [
        { label: 'Home', value: '/', icon: <HomeIcon /> },
        { label: 'SMS', value: '/sms-checker', icon: <SmsIcon /> },
        { label: 'Phone', value: '/phone-checker', icon: <PhoneIcon /> },
        { label: 'URL', value: '/url-checker', icon: <LinkIcon /> },
        { label: 'Learn', value: '/education', icon: <SchoolIcon /> },
        // Add more icons as needed, e.g., for password guide or file check if space allows
    ];

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }} elevation={3}>
            <BottomNavigation showLabels value={value} onChange={handleChange}>
                 {navActions.map(action => (
                     <BottomNavigationAction
                        key={action.value}
                        label={action.label}
                        value={action.value}
                        icon={action.icon}
                        />
                 ))}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;