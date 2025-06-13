import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import FileCheckerPage from './pages/FileCheckerPage';
import EducationPage from './pages/EducationPage';
import PasswordGuidePage from './pages/PasswordGuidePage';
import PhoneCheckerPage from './pages/PhoneCheckerPage';
import SmsCheckerPage from './pages/SmsCheckerPage';
import UrlCheckerPage from './pages/UrlCheckerPage';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/file-checker" element={<FileCheckerPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/password-guide" element={<PasswordGuidePage />} />
          <Route path="/phone-checker" element={<PhoneCheckerPage />} />
          <Route path="/sms-checker" element={<SmsCheckerPage />} />
          <Route path="/url-checker" element={<UrlCheckerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;