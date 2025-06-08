import Baner from "./Baner";
import PizzaList from './PizzaList';

function Pizza() {
  return (
    <div className="pizza">
     <Baner />
    <PizzaList limit={9} withFilter={true} />
    </div>
  );
}

export default Pizza;
