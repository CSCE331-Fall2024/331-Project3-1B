import "./receipt.css";
import { useCart } from "../../customer/myBag/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Receipt() {
    const { cart, setCart } = useCart();
    const { removeItemFromCart } = useCart();

    

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
                    {cart.length == 0 && <h3 className="order-empty">The order is empty.</h3>}
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
                                        onClick={() => {removeCombo(index);playSound('/Sounds/ButtonSound.mp3')}}
                                    >
                                        <h2>Remove</h2>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
        </div>
    );
}

export default Receipt;
