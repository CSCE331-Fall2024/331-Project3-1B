import { useNavigate } from "react-router-dom";
import "./pageHeader.css";

function PageHeader() {
    const navigate = useNavigate();
    const posClick = () => {
        navigate("/");
    };

    return (
        <>
            <div id="header-container">
                <button className="nav-btn" id="pos-btn" onClick={ posClick }>
                    <h1 className="nav-btn-text">POS</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Inventory Orders</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Employee Management</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Sales Trends</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Menu Items</h1>
                </button>

                <button className="nav-btn">
                    <h1 className="nav-btn-text">Sales Order History</h1>
                </button>
            </div>
        </>
    )
}

export default PageHeader;
