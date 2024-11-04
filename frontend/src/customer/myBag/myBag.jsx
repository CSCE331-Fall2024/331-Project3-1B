import { useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import './myBag.css';

// This component will display the items in the cart, functionality not complete yet. 
export default function () {
    const navigate = useNavigate();
    const { cart } = useCart();
    const { clearCart } = useCart();
    const {removeItemFromCart} = useCart();
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

    useEffect(() => {
        console.log("Cart contents:", cart);
    }, [cart]);
    return (
        <>
            <button onClick={clearCurrCart}>Clear Cart</button>
            <button onClick={orderMore}>Order more</button>
            <div id="my-bag-container">
                <h1 id="my-bag-title">My Bag</h1>
                <div id="my-bag-contents">
                    {cart?.map((combo, index) => (
                        <div key={index}>
                        {index%2 == 0 && (
                            <div>
                                <h1>{combo}</h1>
                            </div>
                        )}
                        {index%2 == 1 && combo?.map((item, itemIndex) => (
                                <div key={itemIndex} >
                                    <h2>{item.name}</h2>
                                    <h2>{item.quantity}</h2>
                                </div>
                        ))}
                        <button onClick={() => removeCombo(index)}>Remove combo</button>
                        </div>

                    ))}
                </div>
            </div>  
        </>
    );
}
