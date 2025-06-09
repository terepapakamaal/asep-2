import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import your custom theme
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SmsCheckerPage from './pages/SmsCheckerPage';
import PhoneCheckerPage from './pages/PhoneCheckerPage';
import UrlCheckerPage from './pages/UrlCheckerPage';
import FileCheckerPage from './pages/FileCheckerPage';
import PasswordGuidePage from './pages/PasswordGuidePage';
import EducationPage from './pages/EducationPage';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS and apply background color */}
      <Router>
        <Layout> {/* Layout handles Navbar/BottomNav */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sms-checker" element={<SmsCheckerPage />} />
            <Route path="/phone-checker" element={<PhoneCheckerPage />} />
            <Route path="/url-checker" element={<UrlCheckerPage />} />
            <Route path="/file-checker" element={<FileCheckerPage />} />
            <Route path="/password-guide" element={<PasswordGuidePage />} />
            <Route path="/education" element={<EducationPage />} />
            {/* Add other routes as needed */}
            {/* No route for email-breach as it's an external link */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;