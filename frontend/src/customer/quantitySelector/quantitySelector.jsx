// QuantitySelector.jsx
import React, { useState } from 'react';
import './quantitySelector.css';

export default function QuantitySelector({ onQuantityChange }) {
    const [quantity, setQuantity] = useState(0);

    const handleSubtract = () => {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);
        console.log(`QuantitySelector: Subtracted, New Quantity: ${newQuantity}`);
        onQuantityChange(newQuantity);
    };

    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        console.log(`QuantitySelector: Added, New Quantity: ${newQuantity}`);
        onQuantityChange(newQuantity);
    };

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
