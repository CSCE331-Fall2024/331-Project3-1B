import "./itemCardPage.css";
import Quantifier from "../quantitySelector/quantitySelector.jsx";
import React from "react";

export default function ItemPageCard({ type, item, allergens, updateOrder, resetQuantities }) {
    let imagePath = "";
    if (item === "Small" || item === "Medium" || item === "Large") {
        imagePath = `/Images/SoftDrinks/Drinks.png`;
    } else {
        imagePath = `/Images/${type}/${item.replace(/\s+/g, "")}.png`;
    }

    return (
        <div className="item-page-container">
            <img
                className="item-page-card-image"
                src={imagePath}
                alt="image could not be found"
            />
            <h2 className="item-page-card-title">{item}</h2>
            <p className="item-allergens">{allergens}</p>
            <Quantifier
                onQuantityChange={(quantity) => updateOrder(item, type, quantity)}
                resetQuantities={resetQuantities} // Pass reset state to Quantifier
            />
        </div>
    );
}
