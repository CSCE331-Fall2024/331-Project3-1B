import React, { useState } from 'react';
import './quantitySelector.css';

export default function () {
    const [quantity, setQuantity] = useState(0);
    
    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className='quantifier-container'>
            <div className='quantifier'>
                <button className='quantifier-button' onClick={handleSubtract}>-</button>
                <span>{quantity}</span>
                <button className='quantifier-button' onClick={handleAdd}>+</button>
            </div>
        </div>
    )
}