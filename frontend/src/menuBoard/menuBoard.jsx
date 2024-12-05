import "./menuBoard.css";
import { useNavigate } from "react-router-dom";

// The menuBoard component represents a menu board with meal options.
// It includes a header and a list of meal options, each displaying the meal name, calorie range, price, and a note indicating the starting price.
/**
 * generates a menuBoard component
 * The menuBoard component represents a menu board with meal options.
 * It includes a header and a list of meal options, each displaying the meal name, calorie range, price, and a note indicating the starting price.
 * @returns {HTML} The menuBoard component
 */
export default function menuBoard() {

    const navigate = useNavigate();
    
    // Function to navigate back to the main menu
    const back = () => {
        navigate("/")
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    return (
        <>
            <div id="board-container">
                <div className="board-generic">

                    <button onClick={() => {back();playSound('/Sounds/ButtonSound.mp3')}} id="menu-button">
                        <i className="fa-solid fa-right-to-bracket icons"/>{' '}Login
                    </button>   

                    <h1 className="header-generic">PICK A MEAL</h1>

                    <div id="options-list">

                        <div className="option-generic">
                            <span className="option-titles">BOWL</span>
                            <span className="calories-count">240-1010</span>
                            <span className="cal">cal</span>
                            <span className="price">$8.30</span>
                            <span className="starting-at">starting at*</span>

                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PLATE</span>
                            <span className="calories-count">390-1500</span>
                            <span className="cal">cal</span>
                            <span className="price">$9.80</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">BIGGER PLATE</span>
                            <span className="calories-count">540-1990</span>
                            <span className="cal">cal</span>
                            <span className="price">$11.30</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PANDA CUB MEAL</span>
                            <span className="calories-count">330-1020</span>
                            <span className="cal">cal</span>
                            <span className="price">$6.60</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">5 PERSON FAMILY MEAL</span>
                            <span className="calories-count">240-1990</span>
                            <span className="cal">cal</span>
                            <span className="price">$43.00</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                    </div>
                </div>

                <div className="board-generic">
                    <div className="header-generic">SIDE CHOICES</div>

                    <div className="option-generic">
                        <span className="option-titles">CHOW MEIN</span>
                        <span className="calories-count">510</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">WHITE STEAMED RICE</span>
                        <span className="calories-count">380</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">FRIED RICE</span>
                        <span className="calories-count">520</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">SUPER GREENS</span>
                        <span className="calories-count">380</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="header-generic">A LA CARTE BOXES</div>

                    <div className="option-generic">

                        <div className="option-titles">SIDES</div>

                        <div className="option-generic">
                            <span className="calories-count">Medium</span>
                            <span className="price">$4.40</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Large</span>
                            <span className="price">$5.40</span>
                        </div>

                        <div className="option-titles">ENTREES</div>

                        <div className="option-generic">
                            <span className="calories-count">Small</span>
                            <span className="price">$5.20</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Medium</span>
                            <span className="price">$8.50</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Large</span>
                            <span className="price">$11.20</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                    </div>

                </div>

                <div className="board-generic">
                    <div className="header-generic">ENTREE CHOICES</div>

                    <div className="option-generic">
                        <span className="option-titles">ORANGE CHICKEN</span>
                        <span className="calories-count">490</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">STRING BEAN CHICKEN BREAST</span>
                        <span className="calories-count">210</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">HOT ONES BLAZING BOURBON CHICKEN</span>
                        <span className="calories-count">400</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">BLACK PEPPER SIRLOIN STEAK</span>
                        <span className="calories-count">180</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">HONEY WALNUT SHRIMP</span>
                        <span className="calories-count">430</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">GRILLED TERIYAKI CHICKEN</span>
                        <span className="calories-count">250</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">BROCCOLI BEEF</span>
                        <span className="calories-count">150</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">KUNG PAO CHICKEN</span>
                        <span className="calories-count">320</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">HONEY SESAME CHICKEN BREAST</span>
                        <span className="calories-count">340</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">BEIJING BEEF</span>
                        <span className="calories-count">480</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">MUSHROOM CHICKEN</span>
                        <span className="calories-count">220</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">SWEETFIRE CHICKEN BREAST</span>
                        <span className="calories-count">380</span>
                        <span className="cal">cal</span>
                    </div>
                    
                    <div className="option-generic">
                        <span className="option-titles">SUPER GREENS</span>
                        <span className="calories-count">130</span>
                        <span className="cal">cal</span>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
