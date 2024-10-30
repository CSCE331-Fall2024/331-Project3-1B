import React, { createContext, useState, useContext } from "react";

// will go into depth more on this file. 
// this custom react hook will allow us to view, add, and remove items from the cart. 

// create the context
const CartContext = createContext();

// this creates the provider that will be used to wrap the components that need access to the cart
export const CartProvider = ({ children }) => {

    // Initialize the state as an empty array
    const [cart, setCart] = useState(["test","test2"]);

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        setCart((prevCart) => [...prevCart, ...item]);
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
        // allows us to wrap other components with the CartProvider so that they have access to its components. 
        <CartContext.Provider
            value={{ cart, addItemToCart, removeItemFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// exports the useCart hook that allows us to access the cart and its functions
export const useCart = () => useContext(CartContext);
