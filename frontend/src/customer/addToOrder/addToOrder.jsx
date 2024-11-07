import "./addToOrder.css";
import { useCart } from "../myBag/CartContext";
import { useEffect } from "react";
import { useState } from "react";

export default function ({ items = [], onAddToOrder }) {
    const { addItemToCart } = useCart();
    const { cart } = useCart();
    const { currType } = useCart();
    let validOrder = false;
    

    const processEntreesSides = (orderItems) => {
        let entrees = 0;
        let sides = 0;
        for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i].type == "Entrees") {
                entrees += orderItems[i].quantity;
            } else if (orderItems[i].type == "Sides") {
                sides += orderItems[i].quantity;
            }
        }
        return [entrees, sides];
    };

    const addToOrderTotal = () => {
        const entreeSides = processEntreesSides(items);
        const entrees = entreeSides[0];
        const sides = entreeSides[1];
        if (currType == "Bowl") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 1 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "Plate") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 2 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "Bigger Plate") {
            console.log("Entrees:", entrees, "Sides:", sides);
            if (entrees == 3 && sides == 1) {
                validOrder = true;
            }
        }
        else if (currType == "5 Person Meal") {
            if (entrees == 3 && sides == 2) {
                validOrder = true;
            }
        }


        console.log("Valid Order:", validOrder);
        if (validOrder == true) {
            addItemToCart([currType, items]);
            onAddToOrder(); // Trigger reset in ItemPage
        }
    };

    return (
        <button onClick={addToOrderTotal} className="add-to-order-button">
            <h2>Add to Order</h2>
        </button>
    );
}
