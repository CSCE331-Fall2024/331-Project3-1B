import "./orderItem.css";

// creates a card for each of the most recent orders
/**
 * creates a card for each of the most recent orders
 * @returns {HTML} the order card
 */
function OrderItem ({ orderTotal, orderNumber }) {
    return (
        <>
            <div id="order-container">
                <h4 id="order-item">
                    Total: ${orderTotal}{' '}- Order Number:{' '}{orderNumber}
                </h4>
            </div>
        </>
    );
}

export default OrderItem;
