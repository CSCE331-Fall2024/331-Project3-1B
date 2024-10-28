import './itemCard.css';

function ItemCard({type}) {

    return(
        <>
            <button className='item-card-container'>
                {/* <img className='item-card-image' src="" alt="" /> */}
                <h2 className='item-card-title'>{type}</h2>
            </button>
        </>
    )
}


export default ItemCard;