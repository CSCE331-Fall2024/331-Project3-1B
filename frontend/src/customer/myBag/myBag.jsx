import { useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../chatbot/chatbot.jsx";
import "./myBag.css";

// This component will display the items in the cart, functionality not complete yet.
/**
 * This component will display the items in the cart
 * @returns {HTML} MyBag component
 */
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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    useEffect(() => {
        // Fetch the cart from localStorage to ensure it's updated on component load
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    

    return (
        <>
            

            <div id="header-container">
                <h1 id="header-title">Panda Express</h1>
                <button
                    onClick={() => {
                        orderMore();
                        playSound("/Sounds/ButtonSound.mp3");
                    }}
                    className="order-more-button"
                >   
                    <p className="button-text"><i className="fa-solid fa-circle-plus icons"/>{' '}Order More</p>
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
                                        onClick={() => {
                                            removeCombo(index),
                                                playSound(
                                                    "/Sounds/ButtonSound.mp3"
                                                );
                                        }}
                                    >
                                        <p className="button-text"><i className="fa-solid fa-trash icons"/>{' '}Remove</p>
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
                                onClick={() => {
                                    clearCurrCart();
                                    playSound(
                                        "/Sounds/ButtonSound.mp3"
                                    );
                                }}
                                className="clear-cart-button"
                            >
                                <p className="button-text"><i className="fa-solid fa-trash icons"/>{' '}Clear Cart</p>
                            </button>
                            <button
                                onClick={() => {
                                    placeOrder();
                                    playSound(
                                        "/Sounds/ButtonSound.mp3"
                                    );
                                }}
                                className="place-order-button"
                            >
                                <p className="button-text"><i className="fa-solid fa-cash-register icons"/>{' '}Checkout</p>
                            </button>
                            <Chatbot /> 
                        </>
                    )}
                    {cart.length == 0 && (
                        <Chatbot /> 
                    )}
                </div>
            </footer>
        </>
    );
}
