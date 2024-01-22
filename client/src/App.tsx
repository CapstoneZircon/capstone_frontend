import React from 'react';
import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SaleOrder from './pages/salesOrder';
import Footage from './pages/footage_main';
import Records1 from './pages/records_old_pagination';
import Records from './pages/records_antd'
import VideoFootagePage from './pages/footage_video';

import { Routes , BrowserRouter as Router  , Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";

const App = () => {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({children}:any) => {
    if(!currentUser){
      return(
        <Navigate to="/"/>
      )
    }return(
      children
    )
    
  }

  return (
      
      <Router>
        <Routes>
          <Route path='/' element = {<LoginPage></LoginPage>} />
          <Route path='/home' element = {<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/records' element = {<ProtectedRoute><Records /></ProtectedRoute>} />
          <Route path='/footage' element = {<ProtectedRoute><Footage /></ProtectedRoute>} />
          <Route path="/footage/:videoId" element={<ProtectedRoute><VideoFootagePage /></ProtectedRoute>} />
          {/* <Route path='/profile' element = {<ProtectedRoute><Records /></ProtectedRoute>} /> */}
          {/* <Route path='/signup' element = {<ProtectedRoute><SignUpPage /></ProtectedRoute>} /> */}
        </Routes>

      </Router>

  );
}

export default App;
