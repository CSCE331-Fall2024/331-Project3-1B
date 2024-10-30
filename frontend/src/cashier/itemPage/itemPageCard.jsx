import "./itemCardPage.css";
import { useNavigate } from "react-router-dom";
import Quantifier from "../quantitySelector/quantitySelector.jsx";

export default function itemPageCard({ type }) {

    const handleClick = (type) => {
        return () => {
            console.log(type);
        };
    };

    

    return (
        <>
            <button onClick={handleClick(type)} className="cashier-item-page-container">
                    <img
                        className="cashier-item-page-card-image"
                        src={`images/${type}.jpg`}
                        alt="image could not be found"
                    />
                <h2 className="cashier-item-page-card-title">{type}</h2>
                <Quantifier />
            </button>
        </>
    );
}
