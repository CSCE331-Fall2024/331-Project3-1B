import "./intermediate.css"

export function IntermediatePage(){
    return (
        <div className="IntermediatePage">
            <div className="header-bar">

            </div>
            <div className="main-content">

                <div className="label-container">
                    <div className="label">
                        <h1>Select Location</h1>
                    </div>
                </div>

                <div className="navigate-buttons">
                    <button className="Customer-button">POS</button>
                    <button className="POS-button">Cashier</button>
                    <button className="Manager-button">Manager</button>
                </div>
                
            </div>
        </div>
    );
}

export default IntermediatePage;