import React, { createContext, useState, useContext } from "react";

// 1. Create the Context
const CartContext = createContext();

// 2. Create a Provider component
export const CartProvider = ({ children }) => {
    // Initialize the state as an empty array
    const [cart, setCart] = useState(["test"]);

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to remove an item from the cart by its index
    const removeItemFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addItemToCart, removeItemFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 3. Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
