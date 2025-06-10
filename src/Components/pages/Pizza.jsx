import Baner from "../common/Baner";
import PizzaList from '../pizza/PizzaList';

function Pizza() {
  return (
    <div className="pizza">
      <Baner />
      <PizzaList limit={9} withFilter={true} />
    </div>
  );
}

export default Pizza;
