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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
    // The function that will submit the order once connected with backend call
    const submitOrder = async () => {
        
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        let _types = [];
        let _items = [];

        for(let i = 0 ; i < savedCart.length ; ++i){
            if (i % 2 === 0){
                _types.push(savedCart[i]);
            }
            else {
                let combo_items = []; 
                for(let j = 0; j < savedCart[i].length; ++j){
                    console.log(savedCart[i][j].name);
                    combo_items.push(savedCart[i][j].name);
                }
                _items.push(combo_items);
            }
        }

        try {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/submit/submit-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    types : _types,
                    items: _items
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
            clearCart();
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
                <button onClick = {() => {back();playSound('/Sounds/ButtonSound.mp3')}}className="cashier-header-button">Back</button>
                <button onClick={() => {submitOrder();playSound('/Sounds/ButtonSound.mp3')}} className="cashier-header-button">Submit</button>
                <button onClick = {() => {clearCurrCart();playSound('/Sounds/ButtonSound.mp3')}}className="cashier-header-button">Delete Order</button>
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
