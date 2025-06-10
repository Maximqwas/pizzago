import './Baner.css';
import background from '../../assets/pizza-bg.jpg';
import { FaConciergeBell } from "react-icons/fa";

function Baner() {
  return (
    <section className="baner" style={{ backgroundImage: `url(${background})` }}>
      <div className="baner__search-container">
        <input type="text" className="baner__search" placeholder="Пошук..." />
        <FaConciergeBell className="baner__icon" />
      </div>

    </section>
  );
}

export default Baner;
