import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import Footage from './pages/footage_main';
import Records from './pages/records_antd'
import VideoFootagePage from './pages/footage_video';
import ForgotToScan from './pages/forgot_to_sacn';

import React, { useState, useEffect, useContext } from 'react';
import { Routes, BrowserRouter as Router, Route, useLocation  } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const App = () => {
  // Retrieve authenticated status from localStorage, default to false if not found
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    const storedAuthenticated = localStorage.getItem('authenticated');
    return storedAuthenticated ? JSON.parse(storedAuthenticated) : false;
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          setAuthenticated(true);
          localStorage.setItem('authenticated', JSON.stringify(true)); 
        } else {
          setAuthenticated(false);
          localStorage.removeItem('authenticated'); 
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);
        localStorage.removeItem('authenticated');
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', JSON.stringify(true));
  };


  const ProtectedRoute = ({ children }: any) => {
    // console.log("authenticated: ",authenticated)

    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/records' element={<ProtectedRoute><Records /></ProtectedRoute>} />
        <Route path='/footage' element={<ProtectedRoute><Footage /></ProtectedRoute>} />
        <Route path="/footage/:videoId" element={<ProtectedRoute><VideoFootagePage /></ProtectedRoute>} />
        <Route path='/scans' element={<ProtectedRoute><ForgotToScan /></ProtectedRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;
