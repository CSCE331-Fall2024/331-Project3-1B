import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
function CashierPageHeader(){
    return(
        <div className="header-bar">
                <div className="buttons">
                    <button className="submit-button">Submit</button>
                    <button className="delete-button">Delete</button>
                    <button className="clock-button">Clock In</button>
                    <button className="clock-button">Clock Out</button>
                </div>
            </div>
    );
}
function Cashier() {
    return (
        <div className="cashier">
            <CashierPageHeader />
            <div className="main-content">
                <div className="total-container">
                    <div className="inner-rectangle">
                        <h3>Total:</h3>
                    </div>
                </div>
                <div className="cards-container">
                 <MenuItemTypes />
                </div>
            </div>
        </div>
    );
}

export default Cashier;