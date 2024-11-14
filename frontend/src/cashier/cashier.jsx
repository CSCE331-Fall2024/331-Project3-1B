import { CartProvider } from "../customer/myBag/CartContext.jsx";
import "./cashier.css";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import Receipt from "./receipt/receipt.jsx";
import { useCart } from "../customer/myBag/CartContext.jsx";
import { Link, useNavigate } from 'react-router-dom';

// CashierPageHeader is the component that cashier view.
export function CashierPageHeader() {
    const { cart, setCart } = useCart();
    
    const navigate = useNavigate();

    const { clearCart } = useCart();
    const clearCurrCart = () => {
        clearCart();
    };

    const back = () => {
        navigate('/');
    };


    return (
        <CartProvider>
            <div className="cashier-header-bar">
                <button onClick = {back}className="cashier-header-button">Back</button>
                <button className="cashier-header-button">Submit</button>
                <button onClick = {clearCurrCart}className="cashier-header-button">Delete Order</button>
                <button className="cashier-header-button">Clock In</button>
                <button className="cashier-header-button">Clock Out</button>
            </div>
        </CartProvider>
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
