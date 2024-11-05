import './addToOrder.css';
import { useCart } from '../myBag/CartContext';
import { useEffect } from 'react';

export default function ({ items = [], onAddToOrder }) {
    const { addItemToCart } = useCart();
    const { cart } = useCart();
    const { currType } = useCart();

    const addToOrderTotal = () => {
        
        addItemToCart([currType, items]);
        onAddToOrder(); // Trigger reset in ItemPage
    };
    

    return (
        <button onClick={addToOrderTotal} className="add-to-order-button">
            <h2>Add to Order</h2>
        </button>
    );
}
