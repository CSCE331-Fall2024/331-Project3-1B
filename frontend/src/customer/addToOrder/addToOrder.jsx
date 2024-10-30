import './addToOrder.css';

export default function () {
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
