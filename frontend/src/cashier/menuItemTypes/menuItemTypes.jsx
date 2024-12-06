import ItemCard from "./itemCard";
import "./menuItemTypes.css";


// MenuItemTypes is the component that displays the different types of items that the user can select from
/**
 *  MenuItemTypes is the component that displays the different types of items that the user can select from
 * @return {HTML} MenuItemTypes element
 */
function MenuItemTypes() {
    const types = [
        "Bowl",
        "Plate",
        "Bigger Plate",
        "Panda Cub Meal",
        "5 Person Meal",
        "Appetizers and More",
        "Drinks",
        "Catering",
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
