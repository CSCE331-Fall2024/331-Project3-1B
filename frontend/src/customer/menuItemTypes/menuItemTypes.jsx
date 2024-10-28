import { useState } from "react";
import ItemCard from "./itemCard";
import "./menuItemTypes.css";

function MenuItemTypes() {
  const types = ["Bowl", "Plate", "Bigger Plate", "Panda Cub Meal", "Panda Bundle", "5 Person Meal", "Appetizers and More", "Drinks", "Applie Pie Roll", "Catering", "Gatorade Lemon Lime", "A La Carte"];

  return (
      <div className="item-type-card-container">
        {
          types?.map((type) => {
            return (
              <ItemCard type={type} />
            );
          })
        }
      </div>
  );
}

export default MenuItemTypes;
