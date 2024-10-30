import ItemPageCard from "../itemPage/itemPageCard";
import { CartProvider } from "../myBag/CartContext.jsx";
import Nav from "../header/pageHeader.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import { useState } from "react";
import './drinks.css';


// Appetizers component, displays the appetizers and includes the AddToOrder component
export default function () {
    const [currOrder, setCurrOrder] = useState(["Test", "Test2"]);

    const drinks = [
        "Small",
        "Medium",
        "Large",
        "Bottled Water",
        "Gatorade Lemon Lime"
    ];

    return (
        <>
            {/* wrapping the components with CartProvider so that they have access to the CartContext component contents.  */}
            <CartProvider>
                <Nav />
                <h1 className="item-page-title appetizers-title">Drinks</h1>
                <div className="item-page-type-container">
                    {drinks.map((drink, index) => {
                        return (
                            <ItemPageCard
                                type={"SoftDrinks"}
                                item={drink}
                                key={index}
                            />
                        );
                    })}
                </div>
                <AddToOrder items={currOrder} />
                <BackToMenu />
            </CartProvider>
        </>
    );
}
