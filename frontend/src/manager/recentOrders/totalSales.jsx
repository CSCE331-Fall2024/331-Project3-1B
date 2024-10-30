import "./totalSales.css";

// creates a display for the total sales today
function TotalSales ({ totalSales }) {
    return (
        <>
            <h2 id="total-sales-display">Total Sales Today: ${ totalSales } </h2>
            <h3>Recent Orders:</h3>
        </>
    );
};

export default TotalSales;