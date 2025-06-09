import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';

const Layout = ({ children }) => {
  const theme = useTheme();
  // Use MUI's breakpoint system for responsiveness
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md breakpoint is 900px by default
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar isMobile={isMobile} onMenuClick={toggleDrawer(true)} />
      <MobileDrawer open={drawerOpen} onClose={toggleDrawer(false)} />

      {/* Add paddingTop to prevent content from hiding behind AppBar */}
      {/* Add paddingBottom if using BottomNav to prevent overlap */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: theme.spacing(8), // Standard AppBar height is 64px (8 * 8px)
          pb: isMobile ? theme.spacing(7) : 0, // BottomNav height is typically 56px (7 * 8px)
          overflowY: 'auto', // Allow main content to scroll if needed
          bgcolor: 'background.default', // Use theme background
        }}
      >
        {children} {/* This is where the routed page component will be rendered */}
      </Box>

      {isMobile && <BottomNav />}
    </Box>
  );
};

export default Layout;