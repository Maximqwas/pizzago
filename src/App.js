import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Menu from './Components/Menu';
import Layout from './Components/common/Layout';
import Delivery from './Components/delivery/Delivery';
import Promotion from './Components/pages/Promotion';
import Registration from './Components/auth/Registration';
import Home from './Components/home/Home';
import Pizza from './Components/pages/Pizza';
import Drinks from './Components/pages/Drinks';
import OrderHistory from './Components/profile/OrderHistory';
import Profile from './Components/profile/Profile';
import Login from './Components/auth/Login';

function App() {
  const isRegistered = localStorage.getItem('isRegistered') === 'true';

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu/pizza" element={<Pizza />} />
          <Route path="menu/drinks" element={<Drinks />} />
          <Route path="registration" element={<Registration />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
