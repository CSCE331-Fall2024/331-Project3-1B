import "./itemCard.css";
import { useNavigate } from "react-router-dom";

function ItemCard({ type }) {
    const navigate = useNavigate();
    const handleClick = (type) => {
        return () => {
            console.log(type);
            if (type == "Bowl" || type == "Plate" || type == "A La Carte" || type == "Bigger Plate" || type == "Catering" || type == "Panda Bundle" || type == "5 Person Meal") {
                navigate("/order");
            }
            else if (type == "Panda Cub Meal") {
                navigate("/panda-cub-meal");
            }
            else if (type == "Appetizers and More") {
                navigate("/appetizers-and-more");
            }
            else if (type == "Drinks") {
                navigate("/drinks");
            }
            else if (type == "Applie Pie Roll") {
                navigate("/apple-pie-roll");
            }
            else if (type == "Gatorade Lemon Lime") {
                navigate("/gatorade-lemon-lime");
            }
        };
    };
    return (
        <>
            <button onClick={handleClick(type)} className="item-card-container">
                {/* <img className='item-card-image' src="" alt="" /> */}
                <h2 className="item-card-title">{type}</h2>
            </button>
        </>
    );
}

export default ItemCard;
