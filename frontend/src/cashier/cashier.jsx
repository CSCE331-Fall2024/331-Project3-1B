import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";

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

// TotalContainer is the component that displays the total amount of the order, functionality not implemented yet. 
export function TotalContainer() {
    return (
        <div className="total-container">
            <div className="inner-rectangle">
                <h3>Total:</h3>
            </div>
        </div>
    );
}

// Cashier is the component that displays the cashier view.
function Cashier() {
    return (
        <div className="cashier">
            <CashierPageHeader />
            <div className="main-content">
                <TotalContainer />
                <div className="cards-container">
                    <MenuItemTypes />
                </div>
            </div>
        </div>
    );
}

export default Cashier;
