import "./totalSales.css";

function TotalSales ({ totalSales }) {
    return (
        <>
            <h2 id="total-sales-display">Total Sales: ${ totalSales } </h2>
            <h3>Recent Orders:</h3>
        </>
    );
};

export default TotalSales;