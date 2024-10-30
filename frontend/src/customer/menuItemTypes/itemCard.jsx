import "./itemCard.css";
import { useNavigate } from "react-router-dom";

// itemCard is the card that displays the item type
export default function ItemCard({ type }) {
    const navigate = useNavigate();

    // imagePath is the path to the image of the item
    let imagePath = `../../../Images/OrderOptions/${type}.png`;

    // handleClick is a function that navigates to the correct page based on the type of item
    const handleClick = (type) => {
        return () => {
            if (type == "Bowl" || type == "Plate" || type == "A La Carte" || type == "Bigger Plate" || type == "Catering" || type == "Panda Bundle" || type == "5 Person Meal") {
                navigate("/order");
            }
            else if (type == "Panda Cub Meal") {
                navigate("/panda-cub-meal");
            }
            else if (type == "Appetizers and More") {
                navigate("/order/appetizers");
            }
            else if (type == "Drinks") {
                navigate("/drinks");
            }
            else if (type == "Apple Pie Roll") {
                navigate("/apple-pie-roll");
            }
            else if (type == "Gatorade Lemon Lime") {
                navigate("/gatorade-lemon-lime");
            }
        };
    };
    return (
        <>
            <button onClick={handleClick(type)} className="item-card-container">
                <img className='item-card-image' src={imagePath} alt="" />
                <h2 className="item-card-title">{type}</h2>
            </button>
        </>
    );
}

