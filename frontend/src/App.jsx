import "./App.css";
import Customer from "./customer/customer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./customer/itemPage/itemPage.jsx";
import Manager from "./manager/manager.jsx";
import MenuBoards from "./menuBoards/board1.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Customer />} />
                <Route path="/order" element={<ItemPage />} />
                <Route path="/manager" element={<Manager/>} />
                <Route path="/menuBoard" element={<MenuBoards />} />
            </Routes>
        </Router>
    );
}

export default App;
