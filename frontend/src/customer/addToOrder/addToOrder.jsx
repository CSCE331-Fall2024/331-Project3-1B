// AddToOrder.jsx
import './addToOrder.css';
import { useCart } from '../myBag/CartContext';

export default function ({ items = [], onAddToOrder }) {
    const { addItemToCart } = useCart();

    const addToOrderTotal = () => {
        console.log("Add to Order button clicked");
        console.log(items);
        onAddToOrder(); // Trigger reset in ItemPage
    };

    return (
        <button onClick={addToOrderTotal} className="add-to-order-button">
            <h2>Add to Order</h2>
        </button>
    );
}
