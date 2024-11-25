import { CartProvider } from "../customer/myBag/CartContext.jsx";
import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import Receipt from "./receipt/receipt.jsx";
import { useCart } from "../customer/myBag/CartContext.jsx";
import { json, Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {useState } from "react";

// CashierPageHeader is the component that cashier view.
/** CashierPageHeader is the header component of the cashier view
 *  @return {HTML} CashierPageHeader component
 */
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

        const types = ["Bowl", "Plate"];
        const items = [
            ["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken"],
            ["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken", "Black Pepper Sirloin Steak"]
        ];

        try {
            const response = await fetch('http://localhost:3001/submit/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    types : types,
                    items: items
                })
            });

            // console.log('Response status:', response.status); // Log the response status
            // console.log('Response headers:', response.headers); // Log headers for debugging

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     console.error('Server returned an error:', errorData);
            //     throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            // }

            //const data = await response.json();
            //console.log('Server response:', data);
            alert(`Order submitted successfully:`);
            //clearCart();
        } catch (error) {
            console.error('Error submitting order:');
            alert('Failed to submit the order.' + error);
        }


        //console.log("Order Submitted:\n", cart);
        //clearCart();
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
/**
 * Cashier is the component that displays the cashier view.
 * @return {HTML} Cashier compenent
 */
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
