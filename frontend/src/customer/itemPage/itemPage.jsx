import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import Nav from "../header/pageHeader.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import AddToOrder from "../addToOrder/addToOrder.jsx";
import { CartProvider } from "../myBag/CartContext.jsx";
import { useState, useEffect } from "react";
import { useCart } from "../myBag/CartContext.jsx";
import { getEntrees, getSides } from "../customerFunctions/customer.js";

export default function ItemPage() {
    const [currOrder, setCurrOrder] = useState([]);
    const [resetQuantities, setResetQuantities] = useState(false);
    const { currType } = useCart();
    const { clearCart } = useCart();

    let constEntrees = getEntrees(currType);
    let constSides = getSides(currType);

    const clearCurrCart = () => {
        clearCart();
    };

    const updateOrder = (name, type, quantity) => {
        setCurrOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (orderItem) => orderItem.name === name
            );
            let newOrder;

            if (existingItem) {
                newOrder =
                    quantity > 0
                        ? prevOrder.map((orderItem) =>
                              orderItem.name === name
                                  ? { ...orderItem, quantity }
                                  : orderItem
                          )
                        : prevOrder.filter(
                              (orderItem) => orderItem.name !== name
                          );
            } else if (quantity > 0) {
                newOrder = [...prevOrder, { name, type, quantity }];
            } else {
                newOrder = prevOrder;
            }

            return newOrder;
        });
    };

    // Reset quantities when "Add to Order" is clicked
    const handleAddToOrder = () => {
        setResetQuantities(true);
    };

    // Use useEffect to listen for resetQuantities changes and reset it to false after updating
    useEffect(() => {
        if (resetQuantities) {
            setResetQuantities(false); // Reset after all quantities are set to 0
        }
    }, [resetQuantities]);

    const sides = [
        ["White Steamed Rice",""],
        ["Fried Rice","contains: egg, soy, wheat, sesame."],
        ["Chow Mein","contains: soy, wheat, sesame."],
        ["Super Greens","contains: soy, wheat."]
    ];
    const entrees = [
        ["Original Orange Chicken","contains: eggs, milk, soy, wheat, sesame."],
        ["Beijing Beef","contains: milk, soy, wheat."],
        ["Grilled Teriyaki Chicken","contains: soy, wheat, sesame."],
        ["Broccoli Beef","contains: soy, wheat, sesame."],
        ["Kung Pao Chicken","contains: peanuts, soy, wheat, sesame."],
        ["Honey Sesame Chicken Breast","contains: wheat, sesame."],
        ["Black Pepper Chicken","contains: soy, wheat."],
        ["String Bean Chicken Breast","contains: soy, wheat, sesame."],
        ["Mushroom Beef","contains: soy, wheat, sesame."],
        ["Honey Walnut Shrimp","contains: tree nuts, shellfish, eggs, milk, soy, wheat."],
        ["Black Pepper Sirloin Steak","contains: soy, wheat."],
        ["Sweet Fire Chicken Breast","contains: wheat."]
    ];

    // ==============================
    // TODO: Add kids drinks to panda cub meal item page. Drink requirement will need to be added along with listing to the footer. 
    // ==============================

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
                                item={side[0]}
                                allergens={side[1]}
                                key={index}
                                updateOrder={updateOrder}
                                resetQuantities={resetQuantities}
                            />
                        ))}
                    </div>
                    <h1 className="item-page-title">Entrees</h1>
                    <div className="item-page-type-container extra-bottom-space">
                        {entrees.map((entree, index) => (
                            <ItemPageCard
                                type="Entrees"
                                item={entree[0]}
                                allergens={entree[1]}
                                key={index}
                                updateOrder={updateOrder}
                                resetQuantities={resetQuantities}
                            />
                        ))}
                    </div>
                </div>
                <footer className="item-page-footer">
                    <div>
                        <h1 className="footer-type">{currType}</h1>
                        {constEntrees > 0 && constSides > 0 && (
                            <>
                                <h3 className="footer-type-info">
                                    Entrees ({constEntrees}), Sides (
                                    {constSides})
                                </h3>
                            </>
                        )}
                    </div>
                    <div>
                        <AddToOrder
                            items={currOrder}
                            onAddToOrder={handleAddToOrder}
                        />
                        <BackToMenu />
                    </div>
                </footer>
            </CartProvider>
        </>
    );
}
