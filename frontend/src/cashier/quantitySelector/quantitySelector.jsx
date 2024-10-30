import React, { useState } from 'react';
import './quantitySelector.css';


// Quantifier is the component that allows the user to select the quantity of an item
export default function () {
    const [quantity, setQuantity] = useState(0);
    

    // handleSubtract is the function that is called when the user clicks on the subtract button
    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };


    // handleAdd is the function that is called when the user clicks on the add button  
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