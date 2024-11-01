import ItemPageCard from "../itemPage/itemPageCard";
import { CartProvider } from "../myBag/CartContext.jsx";
import Nav from "../header/pageHeader.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import { useState } from "react";
import "./kidsDrinks.css";

// Appetizers component, displays the appetizers and includes the AddToOrder component
export default function () {
    const [currOrder, setCurrOrder] = useState(["Test", "Test2"]);

    const kidsDrinks = [
        "Small",
        "Bottled Water",
        "Gatorade Lemon Lime",
        "Apple Juice",
    ];

    return (
        <>
            {/* wrapping the components with CartProvider so that they have access to the CartContext component contents.  */}
            <CartProvider>
                <Nav />
                <h1 className="item-page-title appetizers-title">
                    Kids Drinks
                </h1>
                <div className="item-page-type-container">
                    {kidsDrinks.map((drink, index) => {
                        return (
                            <ItemPageCard
                                type={"SoftDrinks"}
                                item={drink}
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
