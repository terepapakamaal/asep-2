// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
    background: {
        default: '#f4f6f8', // Light grey background
        paper: '#ffffff',   // White for cards, paper elements
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
        fontWeight: 500,
    },
    // Add other typography customizations
  },
  // Add component overrides if needed
});

export default theme;