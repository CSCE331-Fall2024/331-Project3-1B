import "./intermediate.css"

import { Link, useNavigate } from 'react-router-dom';



export function IntermediatePage(){

    const navigate = useNavigate();

    const navigateToPOS = () => {
        navigate('/cashier');
    };

    const navigateToCustomer = () => {
        navigate('/customer');
    };

    const navigateToManager = () => {
        navigate('/manager');
    };

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
                    <button onClick={navigateToCustomer} className="Customer-button">POS</button>
                    <button onClick={navigateToPOS} className="POS-button">Cashier</button>
                    <button onClick={navigateToManager} className="Manager-button">Manager</button>
                </div>
                
            </div>
        </div>
    );
}

export default IntermediatePage;