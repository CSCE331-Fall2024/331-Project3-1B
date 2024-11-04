import "./App.css";
import Customer from "./customer/customer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./customer/itemPage/itemPage.jsx";
import CashierItemPage from "./cashier/itemPage/itemPage.jsx";
import Manager from "./manager/manager.jsx";
import MenuBoards from "./menuBoards/board1.jsx";
import Cashier from "./cashier/cashier.jsx";
import IntermediatePage from "./intermediate/intermediate.jsx";
import Login from "./login/login.jsx"
import Appetizers from "./customer/appetizers/appetizers.jsx";
import Drinks from "./customer/drinks/drinks.jsx";
import KidsDrinks from "./customer/kidsDrinks/kidsDrinks.jsx";
import ApplePie from "./customer/applePie/applePie.jsx";
function App() {
    return (
        // The Router component is used to define the routes of the application
        <Router>
            {/* The Routes component is used to define the routes of the application */}
            <Routes>
                <Route path="/" element={<Customer />} />
                <Route path="/order" element={<ItemPage />} />
                <Route path="/order/appetizers" element={<Appetizers />} />
                <Route path="/order/drinks" element={<Drinks />} />
                <Route path="/order/kids-drinks" element={<KidsDrinks />} />
                <Route path="/order/apple-pie-roll" element={<ApplePie />} />
                <Route path="/cashier/order" element={<CashierItemPage />} />
                <Route path="/manager" element={<Manager/>} />
                <Route path="/menuBoard" element={<MenuBoards />} />
                <Route path="/cashier" element={<Cashier />} />
            </Routes>
        </Router>
    );
}

export default App;