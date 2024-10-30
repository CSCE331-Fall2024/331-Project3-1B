import "./orderItem.css";
import React, { useState } from 'react';

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