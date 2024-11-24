import { useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "../googleTranslate/googleTranslate.jsx";
import "./myBag.css";

// This component will display the items in the cart, functionality not complete yet.
export default function () {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const { clearCart } = useCart();
    const { removeItemFromCart } = useCart();

    // The function that will clear the current cart
    const clearCurrCart = () => {
        clearCart();
    };

    // The function that will navigate back to the home page
    const orderMore = () => {
        navigate("/customer");
    };

    // The function that will remove a combo from the cart
    const removeCombo = (index) => {
        removeItemFromCart(index);
    };

    // The function that will submit the order once connected with backend call
    const placeOrder = () => {
        console.log("Placing order:\n:", cart);
        clearCart();
    };

    useEffect(() => {
        // Fetch the cart from localStorage to ensure it's updated on component load
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    return (
        <>

            <div id="header-container">
                <h1 id="header-title">Panda Express</h1>
                <button onClick={orderMore} id="header-button">
                    <h1 className="header-button-title">Order More</h1>
                </button>
            </div>
            {/* <GoogleTranslate /> */}
            <div className="my-bag-container">
                <h1 className="my-bag-title">My Bag</h1>
                <div className="my-bag-contents">
                    {cart.length == 0 && <h3>Your cart is empty</h3>}
                    {cart?.map((combo, index) => (
                        <div key={index} className="order-layout">
                            <div className="order-container">
                                <div className="combo-name-container">
                                    {index % 2 == 0 && (
                                        <div>
                                            <h1>{combo}</h1>
                                        </div>
                                    )}
                                </div>

                                <div className="items-container">
                                    {index % 2 == 1 && (
                                        <div>
                                            <h2>Entrees:</h2>
                                        </div>
                                    )}
                                    {index % 2 == 1 &&
                                        combo?.map(
                                            (item, itemIndex) =>
                                                item.type == "Entrees" && (
                                                    <div
                                                        key={itemIndex}
                                                        className="order-items"
                                                    >
                                                        <h3>
                                                            {item.name} (
                                                            {item.quantity}) (
                                                            {item.type})
                                                        </h3>
                                                    </div>
                                                )
                                        )}
                                    {index % 2 == 1 && (
                                        <div>
                                            <h2>Sides:</h2>
                                        </div>
                                    )}
                                    {index % 2 == 1 &&
                                        combo?.map(
                                            (item, itemIndex) =>
                                                item.type == "Sides" && (
                                                    <div
                                                        key={itemIndex}
                                                        className="order-items"
                                                    >
                                                        <h3>
                                                            {item.name} (
                                                            {item.quantity}) (
                                                            {item.type})
                                                        </h3>
                                                    </div>
                                                )
                                        )}

                                    {index % 2 == 1 && (
                                        <div>
                                            <h2>Appetizers:</h2>
                                        </div>
                                    )}
                                    {index % 2 == 1 &&
                                        combo?.map(
                                            (item, itemIndex) =>
                                                item.type == "Appetizers" && (
                                                    <div
                                                        key={itemIndex}
                                                        className="order-items"
                                                    >
                                                        <h3>
                                                            {item.name} (
                                                            {item.quantity}) (
                                                            {item.type})
                                                        </h3>
                                                    </div>
                                                )
                                        )}

                                    {index % 2 == 1 && (
                                        <div>
                                            <h2>Drinks:</h2>
                                        </div>
                                    )}
                                    {index % 2 == 1 &&
                                        combo?.map(
                                            (item, itemIndex) =>
                                                item.type == "SoftDrinks" && (
                                                    <div
                                                        key={itemIndex}
                                                        className="order-items"
                                                    >
                                                        <h3>
                                                            {item.name} (
                                                            {item.quantity}) 
                                                            {/* ({item.type}) */}
                                                        </h3>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>

                            <div className="remove-button-container">
                                {index % 2 == 1 && (
                                    <button
                                        className="remove-combo-button"
                                        onClick={() => removeCombo(index)}
                                    >
                                        <h2>Remove</h2>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="item-page-footer">
                <div></div>
                <div>
                    {cart.length > 0 && (
                        <>
                            <button
                                onClick={clearCurrCart}
                                className="clear-cart-button"
                            >
                                <h2>Clear Cart</h2>
                            </button>
                            <button
                                onClick={placeOrder}
                                className="place-order-button"
                            >
                                <h2>Checkout</h2>
                            </button>
                        </>
                    )}
                </div>
            </footer>
        </>
    );
}
