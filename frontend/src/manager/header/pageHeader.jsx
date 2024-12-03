import { useNavigate } from "react-router-dom";
import "./pageHeader.css";

// creates the navigation bar at the top of the page
function PageHeader() {

    // function that navigates to the POS/home page
    const navigate = useNavigate();

    const homeClick = () => {
        navigate("/manager");
    }

    const posClick = () => {
        navigate("/customer");
    };

    const manageEmployeesClick = () => {
        navigate("/manager/employees");
    };

    const managerMenuItemsClick = () => {
        navigate("/manager/menuItems")
    };

    const salesOrderHistoryClick = () => {
        navigate("/manager/sales_order_history")
    };

    const back = () => {
        navigate("/")
    }

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
    return (
        <>
            <div id="header-container">

                <button onClick={() => {back();playSound('/Sounds/ButtonSound.mp3')}} className='nav-btn'>
                    <h1 className="nav-btn-text"><i className="fa-solid fa-right-to-bracket icons"/>{' '}Login</h1>
                </button>

                <button className="nav-btn" onClick={() => {homeClick();playSound('/Sounds/ButtonSound.mp3')}}>
                    <h1 className="nav-btn-text"><i className="fa-solid fa-home icons"/>{' '}Manager Home</h1>
                </button>

                <button className="nav-btn" id="pos-btn" onClick={() => {posClick();playSound('/Sounds/ButtonSound.mp3')}}>
                    <h1 className="nav-btn-text"><i className="fa-solid fa-cash-register icons"/>{' '}POS</h1>
                </button>

                <button onClick={() => {manageEmployeesClick();playSound('/Sounds/ButtonSound.mp3')}} className="nav-btn">
                    <h1 className="nav-btn-text"><i className="fa-solid fa-users-gear icons"/>{' '}Employee Management</h1>
                </button>

                <button onClick={() => {managerMenuItemsClick();playSound('/Sounds/ButtonSound.mp3')}} className="nav-btn">
                    <h1 className="nav-btn-text"><i className="fa-solid fa-boxes-stacked icons"/>{' '}Menu Items</h1>
                </button>

                <button onClick={() => {salesOrderHistoryClick(); playSound('/Sounds/ButtonSound.mp3')}} className="nav-btn">
                    <h1 className="nav-btn-text"><i className="fa-solid fa-clock-rotate-left icons"/>{' '}Sales Reports</h1>
                </button>
            </div>
        </>
    )
}

export default PageHeader;
