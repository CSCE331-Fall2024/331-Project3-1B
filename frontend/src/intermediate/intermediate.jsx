import "./intermediate.css"

import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


/**
 * This function generates the intermediate page where you can navigate to the different views
 * @returns {HTML} IntermediatePage
 */
export function IntermediatePage(){

    // Create navigate variable to use for navigation
    const navigate = useNavigate();

    // function to handle login
    const handleLogin = () => {
        
    }

    // Button function to navigate to cashier
    const navigateToPOS = () => {
        navigate('/intermediate/cashierintermediate');
    };

    // Button function to navigate to customer
    const navigateToCustomer = () => {
        navigate('/customer');
    };

    // Button function to navigate to manager
    const navigateToManager = () => {
        navigate('/intermediate/managerintermediate');
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
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
                    <button onClick={() => {navigateToCustomer();playSound('../../../public/Sounds/ButtonSound.mp3')}} className="Customer-button">POS</button>
                    <button onClick={() => {navigateToPOS();playSound('../../../public/Sounds/ButtonSound.mp3')}} className="POS-button">Cashier</button>
                    <button onClick={() => {navigateToManager();playSound('../../../public/Sounds/ButtonSound.mp3')}} className="Manager-button">Manager</button>
                </div>
                
            </div>
        </div>
    );
}

export default IntermediatePage;
