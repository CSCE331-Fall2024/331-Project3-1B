import "./itemCardPage.css";
import { useNavigate } from "react-router-dom";
import Quantifier from "../quantitySelector/quantitySelector.jsx";
import React from "react";

// This is the item page card, displays the information for the item
export default function itemPageCard({ type, item }) {

    // imagePath is the path to the image of the item
    let imagePath = ""; 
    if (item == "Small" || item == "Medium" || item == "Large") {
        imagePath = `../../../Images/SoftDrinks/Drinks.png`;
    }
    else {
        imagePath = `../../../Images/${type}/${item.replace(/\s+/g, "")}.png`;
    }
    console.log(imagePath);



    return (
        <>
            <div
                className="item-page-container"
            >
                <img
                    className="item-page-card-image"
                    src={imagePath}
                    alt="image could not be found"
                />
                
                <h2 className="item-page-card-title">{item}</h2>
                {/* Each card contains a quantifier => add or subtract quantity of item */}
                <Quantifier />
            </div>
        </>
    );
}
