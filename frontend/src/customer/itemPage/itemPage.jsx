import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import Nav from "../header/pageHeader.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import { CartProvider } from "../myBag/CartContext.jsx";
import { useState, useEffect } from "react";

export default function ItemPage() {
    const [currOrder, setCurrOrder] = useState([]);
    const [resetQuantities, setResetQuantities] = useState(false);

    const updateOrder = (item, quantity) => {
        setCurrOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (orderItem) => orderItem.name === item
            );
            let newOrder;
            if (existingItem) {
                newOrder =
                    quantity > 0
                        ? prevOrder.map((orderItem) =>
                              orderItem.name === item
                                  ? { ...orderItem, quantity }
                                  : orderItem
                          )
                        : prevOrder.filter(
                              (orderItem) => orderItem.name !== item
                          );
            } else if (quantity > 0) {
                newOrder = [...prevOrder, { name: item, quantity }];
            } else {
                newOrder = prevOrder;
            }
            // console.log("Updated order contents:", newOrder);
            return newOrder;
        });
    };

    // Reset quantities when "Add to Order" is clicked
    const handleAddToOrder = () => {
        setResetQuantities(true);
        console.log("Reset quantities set to true"); // Check if this logs when button is clicked
    };

    // Use useEffect to listen for resetQuantities changes and reset it to false after updating
    useEffect(() => {
        if (resetQuantities) {
            setResetQuantities(false); // Reset after all quantities are set to 0
            console.log("Quantities reset to 0"); // Confirm reset
        }
    }, [resetQuantities]);

    const sides = [
        "White Steamed Rice",
        "Fried Rice",
        "Chow Mein",
        "Super Greens",
    ];
    const entrees = [
        "Original Orange Chicken",
        "Beijing Beef",
        "Grilled Teriyaki Chicken",
        "Broccoli Beef",
        "Kung Pao Chicken",
        "Honey Sesame Chicken Breast",
        "Black Pepper Chicken",
        "String Bean Chicken Breast",
        "Mushroom Beef",
        "Honey Walnut Shrimp",
        "Black Pepper Sirloin Steak",
    ];

    return (
        <>
            <CartProvider>
                <Nav />
                <div>
                    <h1 className="item-page-title extra-space">Sides</h1>
                    <div className="item-page-type-container">
                        {sides.map((side, index) => (
                            <ItemPageCard
                                type="Sides"
                                item={side}
                                key={index}
                                updateOrder={updateOrder}
                                resetQuantities={resetQuantities}
                            />
                        ))}
                    </div>
                    <h1 className="item-page-title">Entrees</h1>
                    <div className="item-page-type-container">
                        {entrees.map((entree, index) => (
                            <ItemPageCard
                                type="Entrees"
                                item={entree}
                                key={index}
                                updateOrder={updateOrder}
                                resetQuantities={resetQuantities}
                            />
                        ))}
                    </div>
                </div>
                <AddToOrder items={currOrder} onAddToOrder={handleAddToOrder} />
                <BackToMenu />
            </CartProvider>
        </>
    );
}
