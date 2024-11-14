import React, { useState, useEffect } from 'react';
import './quantitySelector.css';

export default function QuantitySelector({ onQuantityChange, resetQuantities }) {
    const [quantity, setQuantity] = useState(0);

    // Function to handle subtracting from quantity
    const handleSubtract = () => {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    // Function to handle adding to quantity
    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    

    // Reset quantity to 0 whenever resetQuantities changes
    useEffect(() => {
        if (resetQuantities) {
            setQuantity(0);
            onQuantityChange(0);
        }
    }, [resetQuantities]);

    return (
        <div className="quantifier-container">
            <div className="quantifier">
                <button className="quantifier-button" onClick={handleSubtract}>-</button>
                <span>{quantity}</span>
                <button className="quantifier-button" onClick={handleAdd}>+</button>
            </div>
        </div>
    );
}
