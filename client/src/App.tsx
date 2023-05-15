import React from 'react';
import './App.css';
import ButtonFeed from './components/Button/ButtonFeed'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SaleOrder from './pages/salesOrder';
import { Routes , BrowserRouter as Router  , Link , Route } from 'react-router-dom';
import Footage from './pages/footage';
import SignUpPage from './pages/signup';


const App = () => {
  

  return (
      <Router>
        <Routes>
          <Route path='/' element = {<LoginPage></LoginPage>} />
          <Route path='/home' element = {<HomePage />} />
          <Route path='/salesOrder' element = {<SaleOrder />} />
          <Route path='/footage' element = {<Footage />} />
          <Route path='/signup' element = {<SignUpPage />} />
        </Routes>

      </Router>
  );
}

export default App;
