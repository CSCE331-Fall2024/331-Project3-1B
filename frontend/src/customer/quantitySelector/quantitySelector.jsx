import React, { useState } from 'react';
import './quantitySelector.css';


// QuantitySelector is the component that allows the user to select the quantity of an item
export default function () {

    // quantity is the state that holds the quantity of the item
    const [quantity, setQuantity] = useState(0);
    
    // handleSubtract is the function that subtracts 1 from the quantity
    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    // handleAdd is the function that adds 1 to the quantity
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