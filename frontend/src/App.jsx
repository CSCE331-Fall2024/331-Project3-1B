import "./App.css";
import Customer from "./customer/customer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./customer/itemPage/itemPage.jsx";
import Manager from "./manager/manager.jsx";
import MenuBoards from "./menuBoards/board1.jsx";
import Cashier from "./cashier/cashier.jsx";
import IntermediatePage from "./intermediate/intermediate.jsx";
import Appetizers from "./customer/appetizers/appetizers.jsx";
import Drinks from "./customer/drinks/drinks.jsx";
import KidsDrinks from "./customer/kidsDrinks/kidsDrinks.jsx";
import ManageEmployees from "./manager/manageEmployees/manageEmployees.jsx";
import MyBag from "./customer/myBag/myBag.jsx";
import Receipt from "./cashier/receipt/receipt.jsx";
import Login from "./login/login.jsx";
import AddEmployee from "./manager/manageEmployees/addEmployee/addEmployee.jsx";
import EditEmployee from "./manager/manageEmployees/editEmployee/editEmployee.jsx";

import { CartProvider } from "./customer/myBag/CartContext.jsx";
import MenuItems from "./manager/menuItems/menuItems.jsx";

function App() {
    return (
        // The Router component is used to define the routes of the application
        <Router>
            {/* The Routes component is used to define the routes of the application */}
            <Routes>
                <Route path="/" element={<IntermediatePage />} />
                <Route path="/order" element={<CartProvider><ItemPage /></CartProvider>} />
                <Route path='myBag' element={<CartProvider><MyBag /></CartProvider>} />
                <Route path="/order/appetizers" element={<CartProvider><Appetizers/></CartProvider>} />
                <Route path="/order/drinks" element={<CartProvider><Drinks/></CartProvider>} />
                <Route path="/order/kids-drinks" element={<CartProvider><KidsDrinks/></CartProvider>} />
                <Route path="/cashier/order" element={<CartProvider><ItemPage/></CartProvider>} />
                <Route path="/cashier/drinks" element={<CartProvider><Drinks/></CartProvider>} />
                <Route path="/cashier/appetizers-and-more" element={<CartProvider><Appetizers/></CartProvider>} />
                <Route path="/manager" element={<Manager/>} />
                <Route path="/menuBoard" element={<MenuBoards />} />
                <Route path="/cashier" element={<Cashier/>} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/manager/employees" element={ <ManageEmployees /> } />
                <Route path="/login" element={<Login/>}/>
                <Route path="/receipt" element={<Receipt/>} />
                <Route path="/manager/menuItems" element={<MenuItems />} />
                <Route path="/manager/employees/add_employee" element={<AddEmployee />} />
                <Route path="/manager/employees/edit_employee" element={<EditEmployee />} />
            </Routes>
        </Router>
    );
}

export default App;
