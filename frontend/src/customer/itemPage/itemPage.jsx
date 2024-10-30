// ItemPage.jsx
import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import Nav from "../header/pageHeader.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import { CartProvider } from "../myBag/CartContext.jsx";
import { useState } from "react";

export default function ItemPage() {
    const [currOrder, setCurrOrder] = useState([]);

    // Function to add or update item quantity in currOrder
    const updateOrder = (item, quantity) => {
        console.log(`Updating item: ${item}, Quantity: ${quantity}`);
        setCurrOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (orderItem) => orderItem.name === item
            );
            let newOrder;
            if (existingItem) {
                // Update quantity or remove item if quantity is zero
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
                // Add new item if quantity > 0
                newOrder = [...prevOrder, { name: item, quantity }];
            } else {
                newOrder = prevOrder;
            }

            console.log("Updated order contents:", newOrder); // Log the entire order after the change
            return newOrder;
        });
    };

    // Function to finalize order and pass it to AddToOrder component

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
                            />
                        ))}
                    </div>
                </div>
                {/* Pass the finalized order as props to AddToOrder */}
                <AddToOrder items={currOrder} />
                <BackToMenu />
            </CartProvider>
        </>
    );
}
