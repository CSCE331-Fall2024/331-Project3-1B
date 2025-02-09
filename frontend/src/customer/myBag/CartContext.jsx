import React, { createContext, useState, useContext } from "react";

// create the context
const CartContext = createContext();

// this creates the provider that will be used to wrap the components that need access to the cart
/**
 * this creates the provider that will be used to wrap the components that need access to the cart
 * @returns {HTML} CartProvider
 */
export const CartProvider = ({ children }) => {
    // Check for saved cart data in localStorage
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(initialCart);
    const initialCurrType = localStorage.getItem("currType") || "";
    const [currType, setCurrType] = useState(initialCurrType);

    // Function to set the current type
    const setCurrTypeFunc = (type) => {
        setCurrType(type);
        localStorage.setItem("currType", type);
    };

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        const updatedCart = [...cart, ...item];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
    };

    // Function to remove an item from the cart by its index
    const removeItemFromCart = (index) => {
        let updatedCart = cart.filter((_, i) => i !== index);
        updatedCart = updatedCart.filter((_, i) => i !== index-1);

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart"); // Remove from localStorage
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addItemToCart,
                removeItemFromCart,
                clearCart,
                currType,
                setCurrTypeFunc,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// exports the useCart hook that allows us to access the cart and its functions
export const useCart = () => useContext(CartContext);
