import "./itemCardPage.css";
import { useNavigate } from "react-router-dom";
import Quantifier from "../quantitySelector/quantitySelector.jsx";
import React from "react";

export default function itemPageCard({ type, item }) {


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
