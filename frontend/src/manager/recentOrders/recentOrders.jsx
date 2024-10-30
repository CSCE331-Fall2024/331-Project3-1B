import OrderItem from "./orderItem.jsx";
import "./recentOrders.css";
import TotalSales from "./totalSales.jsx";

// creates a container that holds all the most recent orders
// holds temporary data for the orders
function RecentOrders() {
    return (
        <>
            <div id="recent-orders-container">
                <TotalSales totalSales= { 1829.69 } />
                <OrderItem orderTotal= { 29.69 } totalItems= { 3 } />
                <OrderItem orderTotal= { 12.25 } totalItems= { 2 } />
                <OrderItem orderTotal= { 27.21 } totalItems= { 4 } />
                <OrderItem orderTotal= { 23.12 } totalItems= { 3 } />
                <OrderItem orderTotal= { 8.95 } totalItems= { 1 } />
            </div>
        </>
    );
};

export default RecentOrders;