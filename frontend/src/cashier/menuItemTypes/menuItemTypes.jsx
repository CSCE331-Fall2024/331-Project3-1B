import { useState } from "react";
import ItemCard from "./itemCard";
import "./menuItemTypes.css";


// MenuItemTypes is the component that displays the different types of items that the user can select from
function MenuItemTypes() {
    const types = [
        "Bowl",
        "Plate",
        "Bigger Plate",
        "Panda Cub Meal",
        "Panda Bundle",
        "5 Person Meal",
        "Appetizers and More",
        "Drinks",
        "Apple Pie",
        "Catering",
        "Gatorade Lemon Lime",
        "A La Carte",
    ];

    return (
        <div className="item-type-card-container">
            {types?.map((type, index) => {
                return <ItemCard key={index} type={type} />;
            })}
        </div>
    );
}

export default MenuItemTypes;
