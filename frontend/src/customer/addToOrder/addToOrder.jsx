import './addToOrder.css';

// Add to Order button component, functionality not yet implemented
export default function () {

    // functionality not implemented but this button will add the item or items to the order
    const addToOrderTotal = () => {
        console.log("Add to Order button clicked");
    };

    return (
        <>
            <button onClick={addToOrderTotal} className="add-to-order-button">
                <h2>Add to Order</h2>
            </button>
        </>
    );
}
