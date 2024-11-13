import { CartProvider } from "../customer/myBag/CartContext.jsx";
import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import Receipt from "./receipt/receipt.jsx";

// CashierPageHeader is the component that cashier view.
export function CashierPageHeader() {
    return (
        <div className="cashier-header-bar">
            <button className="cashier-header-button">Submit</button>
            <button className="cashier-header-button">Delete</button>
            <button className="cashier-header-button">Clock In</button>
            <button className="cashier-header-button">Clock Out</button>
        </div>
    );
}

// Cashier is the component that displays the cashier view.
function Cashier() {
    return (
        <CartProvider>
        <div className="cashier">
            <div className="header">
                <CashierPageHeader />
            </div>

            <div className="cashier-content-container">
                <div className="cashier-receipt">
                    <Receipt />
                </div>
                <div className="cards-container">
                    <MenuItemTypes />
                </div>
            </div>
            
        </div>
        </CartProvider>
    );
}

export default Cashier;
