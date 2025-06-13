import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import your custom theme

// Auth
import { AuthProvider, useAuth } from './components/AuthContext'; // Corrected import path

// Layout and Pages
import ProtectedLayout from './components/ProtectedLayout';
import HomePage from './pages/HomePage';
import SmsCheckerPage from './pages/SmsCheckerPage';
import PhoneCheckerPage from './pages/PhoneCheckerPage';
import UrlCheckerPage from './pages/UrlCheckerPage';
import PasswordGuidePage from './pages/PasswordGuidePage';
import EducationPage from './pages/EducationPage';

// Non-protected pages (assuming you move SignIn.js and SignUp.js)
import SignInPage from './pages/SignInPage'; // e.g., src/pages/SignInPage.js
import SignUpPage from './pages/SignUpPage'; // e.g., src/pages/SignUpPage.js

import './App.css';

// This component will handle routing logic based on authentication state
const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You might want a more sophisticated loading screen here
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes: if authenticated, redirect to home, otherwise show page */}
      <Route path="/signin" element={!isAuthenticated ? <SignInPage /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" replace />} />

      {/* Protected routes: wrapped by ProtectedLayout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="sms-checker" element={<SmsCheckerPage />} />
        <Route path="phone-checker" element={<PhoneCheckerPage />} />
        <Route path="url-checker" element={<UrlCheckerPage />} />
        <Route path="password-guide" element={<PasswordGuidePage />} />
        <Route path="education" element={<EducationPage />} />
        {/* Add other protected routes here. They will be relative to the ProtectedLayout. */}
        {/* Example: <Route path="dashboard" element={<DashboardPage />} /> */}
      </Route>

      {/* Fallback: Redirect to home if authenticated, or signin if not */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/signin"} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS and apply background color */}
      <AuthProvider> {/* AuthProvider should wrap Router */}
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
