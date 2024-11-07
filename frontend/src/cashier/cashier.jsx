import "./cashier2.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import Receipt from "./receipt/receipt.jsx";

// CashierPageHeader is the component that cashier view.
export function CashierPageHeader() {
    return (
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

// Cashier is the component that displays the cashier view.
function Cashier() {
    return (
        <div className="cashier">
            <div className="header">
                <CashierPageHeader />
            </div>

            <div className="main-content">
                <div className="receipt">
                    <Receipt />
                </div>
                <div className="cards-container">
                    <MenuItemTypes />
                </div>
            </div>

        </div>
    );
}

export default Cashier;
