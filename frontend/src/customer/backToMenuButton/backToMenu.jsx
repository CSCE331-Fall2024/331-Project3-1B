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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    // Function to navigate back to the main menu
    const backToMenu = () => {
        if (currURL.includes("cashier")) navigate("/cashier");
        else navigate("/customer");
    };

    return (
        <>
            <button onClick={() => {backToMenu();playSound('/Sounds/ButtonSound.mp3')}} className="back-to-menu-button">
                <p><i className="fa-solid fa-chevron-left icons"/> Back to Menu</p>
            </button>
        </>
    );
}
