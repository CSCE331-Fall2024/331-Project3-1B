import { useNavigate } from "react-router-dom";
import './backToMenu.css';

// Back to Menu button
export default function () {

    const navigate = useNavigate();
    
    // Function to navigate back to the main menu
    const backToMenu = () => {
        navigate("/");
    };

    return (
        <>
            <button onClick={backToMenu} className="back-to-menu-button">
                <h2>Back to Menu</h2>
            </button>
        </>
    );
}
