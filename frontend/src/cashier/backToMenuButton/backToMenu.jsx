import { useNavigate } from "react-router-dom";
import './backToMenu.css';


// BackToMenuButton is the component that allows the user to navigate back to the menu (cashier view)
export default function () {
    const navigate = useNavigate();

    // backToMenu is the function that navigates the user back to the menu (cashier view)
    const backToMenu = () => {
        navigate("/cashier");
    };

    return (
        <>
            <button onClick={backToMenu} className="back-to-menu-button2">
                <h2>Back to Menu</h2>
            </button>
        </>
    );
}
