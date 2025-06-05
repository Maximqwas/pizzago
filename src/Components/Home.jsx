import React from 'react';
import Slider from './Slider';
import PizzaList from './PizzaList';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Slider />
      <PizzaList />
    </div>
  );
}

export default Home;

