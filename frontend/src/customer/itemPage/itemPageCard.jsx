import "./itemCardPage.css";
import Quantifier from "../quantitySelector/quantitySelector.jsx";
import React from "react";

/**
 * generates the item page card component given attributes 
 * @param {string} type  
 * @param {string} item
 * @param {string} allergens
 * @param  updateOrder 
 * @param  resetQuantities
 * @returns {HTML} ItemPageCard
 */
export default function ItemPageCard({ type, item, allergens, updateOrder, resetQuantities }) {
    let imagePath = "";

    // set image path based on item type
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
