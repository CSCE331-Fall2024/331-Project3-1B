import "./recentOrders.css";
import TotalSales from "./totalSales.jsx";

function RecentOrders() {
    return (
        <>
            <div id="recent-orders-container">
                <TotalSales totalSales= { 4829.69 } />
            </div>
        </>
    );
};

export default RecentOrders;