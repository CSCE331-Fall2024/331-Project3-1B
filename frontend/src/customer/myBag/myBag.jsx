import { useEffect, useState } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../chatbot/chatbot.jsx";
import "./myBag.css";
import { use } from "react";

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
    const [allergies, setAllergies] = useState([]);
    const [showAllergenPopup, setShowAllergenPopup] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [comboPrices, setComboPrices] = useState([]);

    const allergyList = {
        "Apple Pie Roll": ["wheat"],
        "Chicken Egg Roll": ["egg", "milk", "soy", "wheat", "sesame"],
        "Cream Cheese Rangoon": ["egg", "milk", "wheat"],
        "Vegetable Spring Roll": ["soy", "wheat", "sesame"],
        "White Steamed Rice": [],
        "Fried Rice": ["egg", "soy", "wheat", "sesame"],
        "Chow Mein": ["soy", "wheat", "sesame"],
        "Super Greens": ["soy", "wheat"],
        "Original Orange Chicken": ["eggs", "milk", "soy", "wheat", "sesame"],
        "Beijing Beef": ["milk", "soy", "wheat"],
        "Grilled Teriyaki Chicken": ["soy", "wheat", "sesame"],
        "Broccoli Beef": ["soy", "wheat", "sesame"],
        "Kung Pao Chicken": ["peanuts", "soy", "wheat", "sesame"],
        "Honey Sesame Chicken Breast": ["wheat", "sesame"],
        "Black Pepper Chicken": ["soy", "wheat"],
        "String Bean Chicken Breast": ["soy", "wheat", "sesame"],
        "Mushroom Chicken": ["soy", "wheat", "sesame"],
        "Honey Walnut Shrimp": [
            "tree nuts",
            "shellfish",
            "eggs",
            "milk",
            "soy",
            "wheat",
        ],
        "Black Pepper Sirloin Steak": ["soy", "wheat"],
        "Sweet Fire Chicken Breast": ["wheat"],
    };

    // The function that will clear the current cart
    const clearCurrCart = () => {
        clearCart();
    };

    // The function that will navigate back to the home page
    const orderMore = () => {
        navigate("/customer");
        setText("Your cart is empty");
    };

    // The function that will remove a combo from the cart
    const removeCombo = (index) => {
        removeItemFromCart(index);
    };



    const getTotalPrice = async () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        let _types = [];
        let _items = [];
    
        for (let i = 0; i < savedCart.length; ++i) {
            if (i % 2 === 0) {
                if (
                    savedCart[i] == "Drinks" ||
                    savedCart[i] == "Appetizers and More"
                ) {
                    _types.push("A La Carte Small");
                } else {
                    _types.push(savedCart[i]);
                }
            } else {
                let combo_items = [];
                for (let j = 0; j < savedCart[i].length; ++j) {
                    combo_items.push(savedCart[i][j].name);
                }
                _items.push(combo_items);
            }
        }
    
        const params = new URLSearchParams({
            types: JSON.stringify(_types),
            items: JSON.stringify(_items),
        });
    
        try {
            const response = await fetch(
                `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/submit/total-price?${params}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            const data = await response.json();
            setTotalPrice(data.total_price);
            setComboPrices(data.comboPrices); // Save individual combo prices
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit the order." + error);
        }
    };
    



    useEffect(() => {   
        // console.log("Total Price: ", totalPrice);
    }, [totalPrice]);

    useEffect(() => {
        getTotalPrice();
    }, [cart]);



    // The function that will submit the order once connected with backend call
    const placeOrder = async () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        let _types = [];
        let _items = [];

        for (let i = 0; i < savedCart.length; ++i) {
            if (i % 2 === 0) {
                if (
                    savedCart[i] == "Drinks" ||
                    savedCart[i] == "Appetizers and More"
                ) {
                    _types.push("A La Carte Small");
                } else {
                    _types.push(savedCart[i]);
                }
            } else {
                let combo_items = [];
                for (let j = 0; j < savedCart[i].length; ++j) {
                    // console.log(savedCart[i][j].name);
                    combo_items.push(savedCart[i][j].name);
                }
                _items.push(combo_items);
            }
        }

        try {
            const response = await fetch(
                `http://localhost:${
                    import.meta.env.VITE_BACKEND_PORT
                }/submit/submit-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        types: _types,
                        items: _items,
                    }),
                }
            );

            alert(`Order submitted successfully:`);
            clearCart();
        } catch (error) {
            console.error("Error submitting order:");
            alert("Failed to submit the order." + error);
        }
        setShowAllergenPopup(false);
        setText("Your order has been placed successfully!");
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

        const uniqueAllergies = new Set();

        // Iterate through the cart to extract allergies
        for (let i = 0; i < savedCart.length; ++i) {
            for (let j = 0; j < savedCart[i].length; ++j) {
                const itemName = savedCart[i][j].name;
                const itemAllergies = allergyList[itemName] || []; // Get allergies for the item
                itemAllergies.forEach((allergen) =>
                    uniqueAllergies.add(allergen)
                ); // Add to Set
            }
        }

        setAllergies([...uniqueAllergies]);
        // console.log(allergies); // Logs the old state, not the updated one.


        

    }, []);

    useEffect(() => {
        // console.log("Updated allergies:", allergies);
    }, [allergies]);
    const [changeableText, setText] = useState("Your cart is empty");

    function setShowPopup() {
        setShowAllergenPopup(true);
    }

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
                    <p className="button-text">
                        <i className="fa-solid fa-circle-plus icons" /> Order
                        More
                    </p>
                </button>
            </div>
            <div className="my-bag-container">
                <h1 className="my-bag-title">My Bag</h1>
                <div className="my-bag-contents">
                    {cart.length == 0 && <h3>{changeableText}</h3>}
                    {cart?.map((combo, index) => (
                        <div key={index} className="order-layout">
                            <div className="order-container">
                                <div className="combo-name-container">
                                    {index % 2 == 0 && (
                                        <div>
                                            <h1>{combo} - ${comboPrices[Math.floor(index/2)]}</h1>
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
                                        <p className="button-text">
                                            <i className="fa-solid fa-trash icons" />{" "}
                                            Remove
                                        </p>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="allergies-container">
                    {allergies.length > 0 && cart.length > 0 && (
                        <div className="allergy-container">
                            <h1 className="allergies-title">
                                WARNING Allergens:
                            </h1>
                            <div className="allergies-direction">
                                {allergies.map((allergy, index) => (
                                    <h3 key={index}>- {allergy}</h3>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="total-price-container">
                    {cart.length > 0 && (
                        <h1 className="total-price">
                            Total Price: ${totalPrice}
                        </h1>
                    )}
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
                                    playSound("/Sounds/ButtonSound.mp3");
                                }}
                                className="clear-cart-button"
                            >
                                <p className="button-text">
                                    <i className="fa-solid fa-trash icons" />{" "}
                                    Clear Cart
                                </p>
                            </button>
                            <button
                                onClick={() => {
                                    // placeOrder();
                                    setShowPopup();
                                    playSound("/Sounds/ButtonSound.mp3");
                                }}
                                className="place-order-button"
                            >
                                <p className="button-text">
                                    <i className="fa-solid fa-cash-register icons" />{" "}
                                    Checkout
                                </p>
                            </button>
                            <Chatbot />
                        </>
                    )}
                    {cart.length == 0 && <Chatbot />}
                </div>
            </footer>

            {showAllergenPopup && (
                <div className="popup-total-container">
                    <div className="allergies-container-popup">
                        {allergies.length > 0 && cart.length > 0 && (
                            <div className="allergy-container">
                                <h1 className="allergies-title">
                                    WARNING Allergens:
                                </h1>
                                <div className="allergies-direction">
                                    {allergies.map((allergy, index) => (
                                        <h3 key={index}>- {allergy}</h3>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="allergy-popup">
                        <button
                            onClick={() => setShowAllergenPopup(false)}
                            className="place-order-button"
                        >
                            <h1 className="button-text">Cancel</h1>
                        </button>
                        <button
                            onClick={() => {
                                placeOrder();
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                            className="place-order-button"
                        >
                            <h1 className="button-text">Checkout</h1>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
