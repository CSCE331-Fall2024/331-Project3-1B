import { useNavigate } from "react-router-dom";
import "./backToMenu.css";

// Back to Menu button
/**
 * Creates a back to menu button that navigates backwards
 * @returns {HTML} back to menu button
 */
export default function () {
    const currURL = window.location.href;

    const navigate = useNavigate();

    // Function to navigate back to the main menu
    const backToMenu = () => {
        if (currURL.includes("cashier")) navigate("/cashier");
        else navigate("/customer");
    };

    return (
        <>
            <button onClick={backToMenu} className="back-to-menu-button">
                <h2>Back to Menu</h2>
            </button>
        </>
    );
}
