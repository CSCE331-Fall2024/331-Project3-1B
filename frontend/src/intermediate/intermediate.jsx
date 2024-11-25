import "./intermediate.css"

import { Link, useNavigate } from 'react-router-dom';


/**
 * This function generates the intermediate page where you can navigate to the different views
 * @returns {HTML} IntermediatePage
 */
export function IntermediatePage(){

    // Create navigate variable to use for navigation
    const navigate = useNavigate();

    // Button function to navigate to cashier
    const navigateToPOS = () => {
        navigate('/cashier');
    };

    // Button function to navigate to customer
    const navigateToCustomer = () => {
        navigate('/customer');
    };

    // Button function to navigate to manager
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
