function PizzaCard(props) {
    return (
        <div className='pizza'>
            <h1>{props.pizza}</h1>
            <p>{props.description}</p>
            <button className={btn}>Button</button>
        </div>
    );
}
export default PizzaCard;