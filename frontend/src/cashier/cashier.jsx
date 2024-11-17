import { CartProvider } from "../customer/myBag/CartContext.jsx";
import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import Receipt from "./receipt/receipt.jsx";
import { useCart } from "../customer/myBag/CartContext.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {useState } from "react";

// CashierPageHeader is the component that cashier view.
export function CashierPageHeader() {
    const { cart, setCart } = useCart();
    
    const navigate = useNavigate();

    const { clearCart } = useCart();

    // The function that will clear the current cart
    const clearCurrCart = () => {
        clearCart();
    };

    // The function that will navigate back to the home page
    const back = () => {
        console.log('back');
        navigate('/');
    };


    // The function that will submit the order once connected with backend call
    const submitOrder = async () => {

        console.log('In Submit');

        // sample params until receipt can be parsed
        types = ["Bowl", "Plate"];
        items = [["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken"], ["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken", "Black Pepper Sirloin Steak"]];

        try {
            const response = await axios.post('http://localhost:3000/submit/submit-order', {
                types: types,
                items: items,
            });
            alert(`Order submitted successfully! Order Number: ${response.data.order_number}`);
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit the order.');
        }

        console.log("Order Submitted:\n", cart);
        clearCart();
    };

    return (
        <CartProvider>
            <div className="cashier-header-bar">
                <button onClick = {back}className="cashier-header-button">Back</button>
                <button onClick={submitOrder} className="cashier-header-button">Submit</button>
                <button onClick = {clearCurrCart}className="cashier-header-button">Delete Order</button>
                <button className="cashier-header-button">Clock In</button>
                <button className="cashier-header-button">Clock Out</button>
            </div>
        </CartProvider>
    );
}

// Cashier is the component that displays the cashier view.
function Cashier() {
    return (
        <CartProvider>
            <div className="cashier">
                <div className="header">
                    <CashierPageHeader />
                </div>

                <div className="cashier-content-container">
                    <div className="cashier-receipt">
                        <Receipt />
                    </div>
                    <div className="cards-container">
                        <MenuItemTypes />
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default Cashier;
