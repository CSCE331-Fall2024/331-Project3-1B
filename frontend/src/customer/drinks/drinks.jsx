import ItemPageCard from "../itemPage/itemPageCard";
import { CartProvider } from "../myBag/CartContext.jsx";
import Nav from "../header/pageHeader.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import { useState } from "react";
import "./drinks.css";
import { useCart } from "../myBag/CartContext.jsx";
import { useEffect } from "react";
import Chatbot from "../../chatbot/chatbot.jsx";


/**
 * Drinks component, displays the drinks and includes the AddToOrder component
 * @returns {HTML} Drinks component
 */
export default function () {
    const [currOrder, setCurrOrder] = useState([]);
    const [resetQuantities, setResetQuantities] = useState(false);
    const { currType } = useCart();

    const updateOrder = (name, type, quantity) => {
        setCurrOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (orderItem) => orderItem.name === name
            );
            let newOrder;
            
            if (existingItem) {
                newOrder =
                    quantity > 0
                        ? prevOrder.map((orderItem) =>
                              orderItem.name === name
                                  ? { ...orderItem, quantity }
                                  : orderItem
                          )
                        : prevOrder.filter(
                              (orderItem) => orderItem.name !== name
                          );
            } else if (quantity > 0) {
                newOrder = [...prevOrder, { name, type, quantity }];
            } else {
                newOrder = prevOrder;
            }
            
            return newOrder;
        });
    };

    // Reset quantities when "Add to Order" is clicked
    const handleAddToOrder = () => {
        setResetQuantities(true);
    };

    // Use useEffect to listen for resetQuantities changes and reset it to false after updating
    useEffect(() => {
        if (resetQuantities) {
            setResetQuantities(false); // Reset after all quantities are set to 0
        }
    }, [resetQuantities]);
    const drinks = [
        "Soft Drink Small",
        "Soft Drink Medium",
        "Soft Drink Large",
        "Bottled Water",
        "Gatorade Lemon Lime",
    ];

    return (
        <>
            {/* wrapping the components with CartProvider so that they have access to the CartContext component contents.  */}
            <CartProvider>
                <Nav />
                <h1 className="item-page-title appetizers-title">Drinks</h1>
                <div className="item-page-type-container extra-bottom-space">
                    {drinks.map((drink, index) => {
                        return (
                            <ItemPageCard
                                type={"SoftDrinks"}
                                item={drink}
                                key={index}
                                updateOrder={updateOrder}
                                resetQuantities={resetQuantities}
                            />
                        );
                    })}
                </div>
                <footer className="item-page-footer">
                    <div>
                        <h1 className="footer-type">{currType}</h1>
                    </div>
                    <div className="footer-button-container">
                        <Chatbot />
                        <AddToOrder
                            items={currOrder}
                            onAddToOrder={handleAddToOrder}
                        />
                        <BackToMenu />
                    </div>
                </footer>
            </CartProvider>
        </>
    );
}
