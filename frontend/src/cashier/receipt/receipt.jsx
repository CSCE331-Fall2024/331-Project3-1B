import "./receipt.css";
import { useCart } from "../../customer/myBag/CartContext";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
/**
 * this is the receipt that displays all items that are ordered
 * @returns {HTML} receipt component
 */
export function Receipt() {
    const { cart, setCart } = useCart();
    const { removeItemFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const [comboPrices, setComboPrices] = useState([]);

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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    // The function that will remove a combo from the cart
    const removeCombo = (index) => {
        removeItemFromCart(index);
    };

    useEffect(() => {
        // Fetch the cart from localStorage to ensure it's updated on component load
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    return (
        <div className="total-container">
            <div>
                <h1 className="receipt-header">Receipt:</h1>
            </div>
            <div className="receipt-display">
                <div className="my-bag-contents">
                    {cart.length == 0 && (
                        <h3 className="order-empty">The order is empty.</h3>
                    )}
                    {cart?.map((combo, index) => (
                        <div key={index} className="order-layout">
                            <div className="order-container">
                                <div className="combo-name-container">
                                    {index % 2 == 0 && (
                                        <div>
                                            <h1>
                                                {" "}
                                                {combo}{" "}
                                                {comboPrices &&
                                                comboPrices[
                                                    Math.floor(index / 2)
                                                ] ? (
                                                    `- $${
                                                        comboPrices[
                                                            Math.floor(
                                                                index / 2
                                                            )
                                                        ]
                                                    }`
                                                ) : (
                                                    <SpinnerCircular
                                                        size={15}
                                                        thickness={400}
                                                        color="#d61927"
                                                        secondaryColor="#fff"
                                                    />
                                                )}
                                            </h1>
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
                                                            {item.quantity})
                                                            {/* ({item.type}) */}
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
                                                            {item.quantity})
                                                            {/* ({item.type}) */}
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
                                                            {item.quantity})
                                                            {/* ({item.type}) */}
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
                                            removeCombo(index);
                                            playSound(
                                                "/Sounds/ButtonSound.mp3"
                                            );
                                        }}
                                    >
                                        <h2>
                                            <i className="fa-solid fa-trash icons" />{" "}
                                            Remove
                                        </h2>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="total-price-container">
                {cart.length > 0 && (
                    <h1 className="total-price">
                        {totalPrice != 0 ? (
                            `Total Price: $${totalPrice}`
                        ) : (
                            <SpinnerCircular
                                size={15}
                                thickness={400}
                                color="#d61927"
                                secondaryColor="#fff"
                            />
                        )}
                    </h1>
                )}
            </div>
        </div>
    );
}

export default Receipt;
