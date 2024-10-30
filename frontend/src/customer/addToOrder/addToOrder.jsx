import './addToOrder.css';
import { useCart } from '../myBag/CartContext';

// Add to Order button component, functionality not yet implemented
export default function ({items = []}) {
    const { addItemToCart } = useCart();

    // functionality not implemented but this button will add the item or items to the order
    const addToOrderTotal = () => {
        // addItemToCart(items);
        console.log("Add to Order button clicked");
        console.log(items);
    };

    return (
        <>
            <button onClick={addToOrderTotal} className="add-to-order-button">
                <h2>Add to Order</h2>
            </button>
        </>
    );
}
