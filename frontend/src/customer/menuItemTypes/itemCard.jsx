import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../myBag/CartContext.jsx";
import { useEffect } from "react";

// itemCard is the card that displays the item type
/**
 * ItemCard is the component that displays the item type
 * @param {string} type 
 * @return {HTML} ItemCard element
 */
 
export default function ItemCard({ type }) {
    const navigate = useNavigate();
    const { currType, setCurrTypeFunc } = useCart();

    // imagePath is the path to the image of the item
    let imagePath = `/Images/OrderOptions/${type}.png`;

    if (type === "Kids Drinks") {
        imagePath = `/Images/SoftDrinks/AppleJuice.png`;
    }

    

    // handleClick is a function that navigates to the correct page based on the type of item
    const handleClick = (type) => {
        setCurrTypeFunc(type);

        // Navigate based on the type
        if (
            type === "Bowl" ||
            type === "Plate" ||
            type === "A La Carte" ||
            type === "Bigger Plate" ||
            type === "Catering" ||
            type === "5 Person Meal"
        ) {
            navigate("/order");
        } else if (type === "Panda Cub Meal") {
            navigate("/order");
        } else if (type === "Appetizers and More") {
            navigate("/order/appetizers");
        } else if (type === "Drinks") {
            navigate("/order/drinks");
        }
    };

    return (
        <button
            onClick={() => handleClick(type)}
            className="item-card-container"
        >
            <img className="item-card-image" src={imagePath} alt="" />
            <h2 className="item-card-title">{type}</h2>
        </button>
    );
}
