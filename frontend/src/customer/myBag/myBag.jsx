import { useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
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
            <button onClick={clearCurrCart}>Clear Cart</button>
            <button onClick={orderMore}>Order more</button>
            <div id="my-bag-container">
                <h1 id="my-bag-title">My Bag</h1>
                <div id="my-bag-contents">
                    {cart.length == 0 && <h3>Your cart is empty</h3>}
                    {cart?.map((combo, index) => (
                        <div key={index}>
                            {index % 2 == 0 && (
                                <div>
                                    <h1>{combo}</h1>
                                </div>
                            )}
                            {index % 2 == 1 &&
                                combo?.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        <h2>{item.name}</h2>
                                        <h2>{item.quantity}</h2>
                                    </div>
                                ))}
                            {index % 2 == 1 && (
                                <button onClick={() => removeCombo(index)}>
                                    Remove combo
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {cart.length > 0 && (
                <button onClick={placeOrder}>
                    <h2>Checkout</h2>
                </button>
            )}
        </>
    );
}
