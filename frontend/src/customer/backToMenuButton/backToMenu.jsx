import { useNavigate } from "react-router-dom";
import './backToMenu.css';

export default function () {
    const navigate = useNavigate();
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
