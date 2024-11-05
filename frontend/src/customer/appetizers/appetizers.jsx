import ItemPageCard from "../itemPage/itemPageCard";
import { CartProvider } from "../myBag/CartContext.jsx";
import Nav from "../header/pageHeader.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import { useState } from "react";
import { useCart } from "../myBag/CartContext.jsx";
import { useEffect } from "react";

import "./appetizers.css";

// Appetizers component, displays the appetizers and includes the AddToOrder component
export default function () {
    const [currOrder, setCurrOrder] = useState([]);
    const [resetQuantities, setResetQuantities] = useState(false);
    const { currType } = useCart();

    const updateOrder = (item, quantity) => {
        setCurrOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (orderItem) => orderItem.name === item
            );
            let newOrder;
            if (existingItem) {
                newOrder =
                    quantity > 0
                        ? prevOrder.map((orderItem) =>
                              orderItem.name === item
                                  ? { ...orderItem, quantity }
                                  : orderItem
                          )
                        : prevOrder.filter(
                              (orderItem) => orderItem.name !== item
                          );
            } else if (quantity > 0) {
                newOrder = [...prevOrder, { name: item, quantity }];
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
    const appetizers = [
        "Apple Pie Roll",
        "Chicken Egg Roll",
        "Cream Cheese Rangoon",
        "Vegetable Spring Roll",
    ];

    return (
        <>
            {/* wrapping the components with CartProvider so that they have access to the CartContext component contents.  */}
            <CartProvider>
                <Nav />
                <h1 className="item-page-title appetizers-title">Appetizers</h1>
                <div className="item-page-type-container">
                    {appetizers.map((appetizer, index) => {
                        return (
                            <ItemPageCard
                                type={"Appetizers"}
                                item={appetizer}
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
                    <div>
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
