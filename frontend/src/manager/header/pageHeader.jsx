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
        navigate("/");
    };

    const manageEmployeesClick = () => {
        navigate("/manager/employees");
    };

    const managerMenuItemsClick = () => {
        navigate("/manager/menuItems")
    }

    return (
        <>
            <div id="header-container">
                <button className="nav-btn" onClick={ homeClick }>
                    <h1 className="nav-btn-text">Manager Home</h1>
                </button>

                <button className="nav-btn" id="pos-btn" onClick={ posClick }>
                    <h1 className="nav-btn-text">POS</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text" onClick={ manageEmployeesClick }>Employee Management</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text" onClick={ managerMenuItemsClick }>Menu Items</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Sales Order History</h1>
                </button>
            </div>
        </>
    )
}

export default PageHeader;
