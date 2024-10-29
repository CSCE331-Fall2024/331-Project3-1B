import "./cashier.css";

function Cashier() {
    return (
        <div className="cashier">
            <div className="header-bar">
                <div className="buttons">
                    <button className="submit-button">Submit</button>
                    <button className="delete-button">Delete</button>
                    <button className="clock-button">Clock In</button>
                    <button className="clock-button">Clock Out</button>
                </div>
            </div>
            <div className="main-content">
                <div className="total-container">
                    <div className="inner-rectangle">
                        <h3>Total:</h3>
                    </div>
                </div>
                <div className="cards-container">
                <div className="card">Bowl</div>
                    <div className="card">Plate</div>
                    <div className="card">Bigger Plate</div>
                    <div className="card">Panda Cub Meal</div>
                    <div className="card">5 Person Family Meal</div>
                    <div className="card">Panda Bundles</div>
                    <div className="card">Appetizers & More</div>
                    <div className="card">A La Carte</div>
                    <div className="card">Soft Drink</div>
                    <div className="card">Gatorade Lemon Lime</div>
                    <div className="card">Catering</div>
                </div>
            </div>
        </div>
    );
}

export default Cashier;