import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Menu from './Components/Menu';
import Layout from './Components/Layout';
import Delivery from './Components/Delivery';
import Promotion from './Components/Promotion';
import Registration from './Components/Registration';
import Home from './Components/Home';
import Pizza from './Components/Pizza';
import Drinks from './Components/Drinks';

function App() {
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
