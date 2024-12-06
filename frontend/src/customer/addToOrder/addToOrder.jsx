import "./addToOrder.css";
import { useCart } from "../myBag/CartContext";
import { useNavigate } from "react-router-dom";     

/**
 * creates a button that adds items to the order
 * @param the items to add to order
 * @returns {HTML} button 
 */
export default function ({ items = [], onAddToOrder }) {
    const { addItemToCart } = useCart();
    const { cart } = useCart();
    const { currType } = useCart();
    let validOrder = false;
    
    // Process the entrees and sides to get their quantities
    const processEntreesSides = (orderItems) => {
        let entrees = 0;
        let sides = 0;
        for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i].type == "Entrees") {
                entrees += orderItems[i].quantity;
            } else if (orderItems[i].type == "Sides") {
                sides += orderItems[i].quantity;
            }
        }
        return [entrees, sides];
    };


    // Add the current order to the cart and checks if valid order. 
    const addToOrderTotal = () => {
        const entreeSides = processEntreesSides(items);
        const entrees = entreeSides[0];
        const sides = entreeSides[1];
        if (currType == "Bowl") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 1 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "Plate") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 2 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "Bigger Plate") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 3 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "5 Person Family Meal") {
            if (entrees == 3 && sides == 2) {
                validOrder = true;
            }
        }
        else if (currType == "Panda Cub Meal") {
            if (entrees == 1 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "Appetizers and More" || currType == "Drinks" || currType == "Kids Drinks" || currType == "A La Carte Small" || currType == "Party Size") {
            validOrder = true;
        }


        console.log("Valid Order:", validOrder);
        if (validOrder == true && items.length > 0) {
            addItemToCart([currType, items]);
            onAddToOrder(); // Trigger reset in ItemPage
        }
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    // After page navigation, load new screen at top of page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0});
    };

    const currURL = window.location.href;
    const navigate = useNavigate();

    // Function to navigate back to the main menu
    const backToMenu = () => {
        if (currURL.includes("cashier")) navigate("/cashier");
        else navigate("/customer");
    };

    return (
        <button onClick={() => {addToOrderTotal();playSound('/Sounds/ButtonSound.mp3');backToMenu();scrollToTop()}} className="add-to-order-button">
            <p><i className="fa-solid fa-circle-plus icons"/>{' '}Add to Order</p>
        </button>
    );
}
