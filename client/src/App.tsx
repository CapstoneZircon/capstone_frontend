import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SaleOrder from './pages/salesOrder';
import Footage from './pages/footage_main';
import Records1 from './pages/records_old_pagination';
import Records from './pages/records_antd'
import VideoFootagePage from './pages/footage_video';
import VideoFootagePagec from './pages/footage_video';

import React, { useState, useEffect, useContext } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/check-auth', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });
        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const ProtectedRoute = ({ children }: any) => {
    if (!authenticated) {
      // return <Navigate to="/" />;
      return children;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage onLogin={handleLogin} />} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/records' element={<ProtectedRoute><Records /></ProtectedRoute>} />
        <Route path='/footage' element={<ProtectedRoute><Footage /></ProtectedRoute>} />
        <Route path="/footage/:videoId" element={<ProtectedRoute><VideoFootagePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
