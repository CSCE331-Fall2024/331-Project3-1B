import "./pageHeader.css";

function PageHeader() {
    return (
        <>
            <div id="header-container">
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
