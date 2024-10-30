import ItemPageCard from "../itemPage/itemPageCard";
import { CartProvider } from "../myBag/CartContext.jsx";
import Nav from "../header/pageHeader.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import { useState } from "react";
import "./appetizers.css";

// Appetizers component, displays the appetizers and includes the AddToOrder component
export default function () {
    const [currOrder, setCurrOrder] = useState(["Test", "Test2"]);

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
                            />
                        );
                    })}
                </div>
                <footer className="item-page-footer">
                    <AddToOrder items={currOrder} />
                    <BackToMenu />
                </footer>
            </CartProvider>
        </>
    );
}
