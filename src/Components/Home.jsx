import React from 'react';
import Slider from './Slider';
import PizzaList from './PizzaList';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Slider />
      <PizzaList limit={7} withFilter={false} centerLast={true}/>
       <div className="home-description">
        <p>
          Ласкаво просимо до <strong>PizzaGo</strong> — твоя улюблена піцерія онлайн!
          Обирай свою ідеальну піцу з нашого меню
        </p>
        <p>
          Скористайся полем пошуку з автопідказками — просто почни вводити назву піци,
          і ми одразу покажемо відповідні варіанти. Усе працює миттєво та динамічно —
          без оновлення сторінки!
        </p>
        <p>Хочеш щось конкретне? Легко! Вибирай категорії:</p>
        <ul>
          <li>🥦 Вегетаріанські — без м’яса, але з максимумом смаку.</li>
          <li>🍖 М’ясні — ситні й ароматні піци з різними видами м’яса.</li>
          <li>🌶️ Гострі — для справжніх фанів пікантного.</li>
          <li>🌟 Новинки — спробуй щось нове й нестандартне!</li>
        </ul>
        <p>
          🎉 <strong>PizzaGo</strong> — це швидко, смачно та зручно.
          Обери свою піцу вже зараз і насолоджуйся справжнім італійським смаком
          у кожному шматочку!
        </p>
      </div>
    </div>
  );
}

export default Home;

