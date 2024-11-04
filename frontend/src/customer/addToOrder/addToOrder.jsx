import './addToOrder.css';
import { useCart } from '../myBag/CartContext';
import { useEffect } from 'react';

export default function ({ items = [], onAddToOrder }) {
    const { addItemToCart } = useCart();
    const { cart } = useCart();

    const addToOrderTotal = () => {
        console.log("Add to Order button clicked");
        console.log(items);
        addItemToCart([items]);
        onAddToOrder(); // Trigger reset in ItemPage
    };
    useEffect(() => {
        console.log("Updated cart:", cart);
    }, [cart]);

    return (
        <button onClick={addToOrderTotal} className="add-to-order-button">
            <h2>Add to Order</h2>
        </button>
    );
}
