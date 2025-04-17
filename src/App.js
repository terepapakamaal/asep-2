import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import UrlSafetyChecker from './components/UrlSafetyChecker';
import SmsScamChecker from './components/SmsScamChecker';
import PhoneScamChecker from './components/PhoneScamChecker';
import PasswordChecker from './components/PasswordChecker';
import FileMaliciousChecker from './components/FileMaliciousChecker';
import EducationPage from './components/EducationPage';
import EmailBreachRedirect from './components/EmailBreachRedirect';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Router>
      {isMobile ? <BottomNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/url-checker" element={<UrlSafetyChecker />} />
        <Route path="/sms-checker" element={<SmsScamChecker />} />
        <Route path="/phone-checker" element={<PhoneScamChecker />} />
        <Route path="/password-checker" element={<PasswordChecker />} />
        <Route path="/file-checker" element={<FileMaliciousChecker />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/email-breach" element={<EmailBreachRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
