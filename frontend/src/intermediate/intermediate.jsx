import "./intermediate.css"
import { useNavigate } from 'react-router-dom';

/**
 * This function generates the intermediate page where you can navigate to the different views
 * @returns {HTML} IntermediatePage
 */
export function IntermediatePage(){

    // Create navigate variable to use for navigation
    const navigate = useNavigate();

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

    // Button function to navigate to menu board
    const navigateToMenu = () => {
        navigate('/menuBoard');
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

                <p id="label">Select Location</p>

                <div className="navigate-buttons">
                    <button onClick={() => {navigateToCustomer();playSound('/Sounds/ButtonSound.mp3')}} className="pos-button">
                        <i className="fa-solid fa-cart-shopping icons"/>{' '}POS
                    </button>
                    <button onClick={() => {navigateToPOS();playSound('/Sounds/ButtonSound.mp3')}} className="cashier-button">
                        <i className="fa-solid fa-cash-register icons"/>{' '}Cashier
                    </button>
                    <button onClick={() => {navigateToManager();playSound('/Sounds/ButtonSound.mp3')}} className="manager-button">
                        <i className="fa-solid fa-user-tie icons"/>{' '}Manager
                    </button>
                    <button onClick={() => {navigateToMenu();playSound('/Sounds/ButtonSound.mp3')}} className="menu-board-button">
                        <i className="fa-solid fa-circle-info icons"/>{' '}Menu Board
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default IntermediatePage;
