import "./itemCard.css";
import { useNavigate } from "react-router-dom";

function ItemCard({ type }) {
    const navigate = useNavigate();
    let imagePath = `../../../Images/OrderOptions/${type}.png`;
    const handleClick = (type) => {
        return () => {
            console.log(type);
            if (type == "Bowl" || type == "Plate" || type == "A La Carte" || type == "Bigger Plate" || type == "Catering" || type == "Panda Bundle" || type == "5 Person Meal") {
                navigate("/cashier/order");
            }
            else if (type == "Panda Cub Meal") {
                navigate("/cashier/panda-cub-meal");
            }
            else if (type == "Appetizers and More") {
                navigate("/cashier/appetizers-and-more");
            }
            else if (type == "Drinks") {
                navigate("/cashier/drinks");
            }
            else if (type == "Apple Pie Roll") {
                navigate("/cashier/apple-pie-roll");
            }
            else if (type == "Gatorade Lemon Lime") {
                navigate("/cashier/gatorade-lemon-lime");
            }
        };
    };
    return (
        <>
            <button onClick={handleClick(type)} className="item-card-container2">
                { <img className='item-card-image2' src={imagePath} alt="" /> }
                <h2 className="item-card-title2">{type}</h2>
            </button>
        </>
    );
}

export default ItemCard;
