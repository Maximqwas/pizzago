import React from 'react';
import './Promotion.css';

import promo1 from '../../assets/promo1.jpg';
import promo2 from '../../assets/promo2.jpg';
import promo3 from '../../assets/promo3.jpg';

function Promotion() {
  return (
    <div className="promotion">
      <img src={promo1} alt="Акция 1" />
      <img src={promo2} alt="Акция 2" />
      <img src={promo3} alt="Акция 3" />
    </div>
  );
}

export default Promotion;
