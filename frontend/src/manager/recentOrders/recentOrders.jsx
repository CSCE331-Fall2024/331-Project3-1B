import { useEffect, useState } from "react";
import OrderItem from "./orderItem.jsx";
import "./recentOrders.css";

// creates a container that holds all the most recent orders
// displays the 5 most recent orders today
/**
 * creates a container that holds all the most recent orders
 * displays the 5 most recent orders today
 * @return {HTML} RecentOrders container
 */
function RecentOrders() {

    const [orderTotals, setOrderTotals] = useState([]);
    const [orderNumbers, setOrderNumbers] = useState([]);

    useEffect(() => {
        fetch(`https://three31-project3-1b-backend.onrender.com/manager/recent_sales_today`)
            .then(query_res => query_res.json())
            .then(data => {
                const orderNums = data.map(order => order.order_number);
                const orderTotals = data.map(order => order.price);
                setOrderNumbers(orderNums);
                setOrderTotals(orderTotals);
            })
            .catch(console.error("cannot get 5 most recent orders"));
    }, []);

    return (
        <>
            <div id="recent-orders-container">
                <h2 id="recent-orders-title">Recent Orders Today</h2>
                {orderTotals.map((total, index) => <OrderItem key={index} orderTotal={total} orderNumber={orderNumbers[index]}/>)}
            </div>
        </>
    );
};

export default RecentOrders;
