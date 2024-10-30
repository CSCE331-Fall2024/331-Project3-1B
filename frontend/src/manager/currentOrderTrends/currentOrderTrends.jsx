import "./currentOrderTrends.css";

function OrderTrends() {
    let pieChartData = {
        labels: ["Bowl", "Plate", "Bigger Plate", "Cub Meal", "A La Carte Small", "A La Carte Medium", "A La Carte Large"],
        values: [50, 45, 30, 20, 15, 10, 5]
    };

    return (
        <div className="piechart-container">
            <h2 id="trends-title">Today's Order Trends</h2>
            <div id="item-grid">
                <div className="item">
                    <div className="item-name">Bowl</div>
                    <div className="item-value">50 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">Plate</div>
                    <div className="item-value">45 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">Bigger Plate</div>
                    <div className="item-value">30 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">Cub Meal</div>
                    <div className="item-value">20 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">A La Carte Small</div>
                    <div className="item-value">15 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">A La Carte Medium</div>
                    <div className="item-value">10 ct</div>
                </div>
                <div className="item">
                    <div className="item-name">A La Carte Large</div>
                    <div className="item-value">5 ct</div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrends;