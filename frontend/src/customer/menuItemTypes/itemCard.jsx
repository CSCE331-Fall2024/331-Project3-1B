import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../myBag/CartContext.jsx";
import { useEffect } from "react";

// itemCard is the card that displays the item type
export default function ItemCard({ type }) {
    const navigate = useNavigate();
    const { currType, setCurrTypeFunc } = useCart();

    // imagePath is the path to the image of the item
    let imagePath = `../../../Images/OrderOptions/${type}.png`;

    if (type === "Kids Drinks") {
        imagePath = `../../../Images/SoftDrinks/AppleJuice.png`;
    }

    useEffect(() => {
        console.log("Current type:", currType);
    }, [currType]);

    // handleClick is a function that navigates to the correct page based on the type of item
    const handleClick = (type) => {
        setCurrTypeFunc(type);
        console.log("Attempting to set type to:", type);

        // Navigate based on the type
        if (
            type === "Bowl" ||
            type === "Plate" ||
            type === "A La Carte" ||
            type === "Bigger Plate" ||
            type === "Catering" ||
            type === "Panda Bundle" ||
            type === "5 Person Meal"
        ) {
            navigate("/order");
        } else if (type === "Panda Cub Meal") {
            navigate("/order");
        } else if (type === "Appetizers and More") {
            navigate("/order/appetizers");
        } else if (type === "Drinks") {
            navigate("/order/drinks");
        } else if (type === "Kids Drinks") {
            navigate("/order/kids-drinks");
        } else if (type === "Apple Pie") {
            navigate("/order/apple-pie-roll");
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
