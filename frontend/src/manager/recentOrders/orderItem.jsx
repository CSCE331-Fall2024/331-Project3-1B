import "./orderItem.css";
import React, { useState } from 'react';

// creates a card for each of the msot recent orders
function OrderItem ({ orderTotal, totalItems }) {
    const [total, setTotal] = useState(orderTotal);
    const [items, setItems] = useState(totalItems);

    return (
        <>
            <div id="order-container">
                <h4 id="order-item">
                    Total: ${ total } - Items: { items }
                </h4>
            </div>
        </>
    );
}

export default OrderItem;