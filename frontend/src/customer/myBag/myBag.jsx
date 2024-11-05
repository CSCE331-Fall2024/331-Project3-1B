import { useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";
import "./myBag.css";

// This component will display the items in the cart, functionality not complete yet.
export default function () {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const { clearCart } = useCart();
    const { removeItemFromCart } = useCart();
    console.log("Current Order Contents:", cart);

    const clearCurrCart = () => {
        clearCart();
    };

    const orderMore = () => {
        navigate("/");
    };

    const removeCombo = (index) => {
        removeItemFromCart(index);
    };

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
                                    {index % 2 == 1 &&
                                        combo?.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                <h2>
                                                    {item.name} ({item.quantity}
                                                    )
                                                </h2>
                                            </div>
                                        ))}
                                </div>
                                </div>

                                <div className="remove-button-container">
                                    {index % 2 == 1 && (
                                        <button className="remove-combo-button"
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
                <div>{/* <h1 className="footer-type">word</h1> */}</div>
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
