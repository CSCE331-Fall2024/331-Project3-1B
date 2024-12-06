import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../customer/myBag/CartContext.jsx";

// ItemCard is the component that displays the item card in the cashier item page
/**
 * ItemCard is the component that displays the item card in the cashier item page
 * @param {string} type 
 * @return {HTML} ItemCard element
 */
 
function ItemCard({ type }) {
    const { currType, setCurrTypeFunc } = useCart();

    const navigate = useNavigate();

    //  The image path is the path to the image of the item
    let imagePath = `/Images/OrderOptions/${type}.png`;

    if (type === "Kids Drinks") {
        imagePath = `/Images/SoftDrinks/AppleJuice.png`;
    }

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
    //  handleClick is the function that is called when the user clicks on the item card
    const handleClick = (type) => {
        setCurrTypeFunc(type);

        if (
            type == "Bowl" ||
            type == "Plate" ||
            type == "A La Carte Small" ||
            type == "Bigger Plate" ||
            type == "Party Size" ||
            type == "Panda Cub Meal" ||
            type == "5 Person Family Meal"
        ) {
            navigate("/cashier/order");
        } else if (type == "Appetizers and More") {
            navigate("/cashier/appetizers-and-more");
        } else if (type == "Drinks") {
            navigate("/cashier/drinks");
        }
    };
    return (
        <>
            <button
                onClick={() => {handleClick(type);playSound('/Sounds/ButtonSound.mp3')}}
                className="item-card-container2"
            >
                {<img className="item-card-image2" src={imagePath} alt="" />}
                <h2 className="item-card-title2">{type}</h2>
            </button>
        </>
    );
}

export default ItemCard;
