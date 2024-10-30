import "./itemCardPage.css";
import { useNavigate } from "react-router-dom";
import Quantifier from "../quantitySelector/quantitySelector.jsx";
import React from "react";


// ItemPageCard is the component that displays the item card in the cashier item page
export default function itemPageCard({ type, item }) {

    // The image path is the path to the image of the item
    let imagePath = `../../../Images/${type}/${item.replace(/\s+/g, "")}.png`;


    return (
        <>
            <div
                className="cashier-item-page-container"
            >
                <img
                    className="cashier-item-page-card-image"
                    src={imagePath}
                    alt="image could not be found"
                />
                
                <h2 className="cashier-item-page-card-title">{item}</h2>
                <Quantifier />
            </div>
        </>
    );
}
