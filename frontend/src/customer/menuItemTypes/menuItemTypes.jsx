import ItemCard from "./itemCard";
import "./menuItemTypes.css";

// MenuItemTypes is the component that displays all the item types
export default function MenuItemTypes() {
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

    // maps all the types to the ItemCard component
    return (
        <div className="item-type-card-container">
            {types?.map((type, index) => {
                return <ItemCard key={index} type={type} />;
            })}
        </div>
    );
}

