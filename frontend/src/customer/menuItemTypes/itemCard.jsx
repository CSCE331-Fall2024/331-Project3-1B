import "./itemCard.css";

function ItemCard({ type }) {
    const handleClick = (type) => {
        return () => {
            console.log(type);
        };
    };
    return (
        <>
            <button onClick={handleClick(type)} className="item-card-container">
                {/* <img className='item-card-image' src="" alt="" /> */}
                <h2 className="item-card-title">{type}</h2>
            </button>
        </>
    );
}

export default ItemCard;
