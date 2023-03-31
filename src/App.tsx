import React from 'react';
import './App.css';
import ButtonFeed from './components/Button/ButtonFeed'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SaleOrder from './pages/salesOrder';
import { Routes , BrowserRouter as Router  , Link , Route } from 'react-router-dom';


const App = () => {

  return (
      <Router>
          <Routes>

          <Route path='/' element = {<LoginPage></LoginPage>} />
          <Route path='home' element = {<HomePage />} />
          <Route path='home/salesOrder' element = {<SaleOrder />} />

        </Routes>

      </Router>
  );
}

export default App;
