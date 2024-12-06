import "./menuBoard.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


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

    const [price, setPrice] = useState([]);

    // api call to get menu prices. Stores info in array.
    const getCheapestPrice = async () => {
        const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/get_cheapest_option_prices`)
            if (response.ok) {
                const price_list = await response.json();
                console.log(price_list);
                return price_list;
            } else {
                console.error('Error fetching price data')
            }
    };

    useEffect(() => {
        const fetchPrice = async () => {
            const price_list = await getCheapestPrice(); // Pass 'bowl' as a string
            setPrice(price_list);
        };

        fetchPrice();
    }, []);

    return (
        <>
            <div id="board-container">

                <div className="board-generic">

                    <button onClick={() => {back();playSound('/Sounds/ButtonSound.mp3')}} id="menu-button">
                        <i className="fa-solid fa-right-to-bracket icons"/>{' '}Login
                    </button>   

                    <div className="header-generic">PICK A MEAL</div>

                    <div id="options-list">

                        <div className="option-generic">
                            <span className="option-titles">BOWL</span>
                            <span className="calories-count">240-1010</span>
                            <span className="cal">cal</span>
                            <span className="price">{`$${parseFloat(price[0]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>

                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PLATE</span>
                            <span className="calories-count">390-1500</span>
                            <span className="cal">cal</span>
                            <span className="price">{`$${parseFloat(price[1]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">BIGGER PLATE</span>
                            <span className="calories-count">540-1990</span>
                            <span className="cal">cal</span>
                            <span className="price">{`$${parseFloat(price[2]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PANDA CUB MEAL</span>
                            <span className="calories-count">330-1020</span>
                            <span className="cal">cal</span>
                            <span className="price">{`$${parseFloat(price[7]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">5 PERSON FAMILY MEAL</span>
                            <span className="calories-count">240-1990</span>
                            <span className="cal">cal</span>
                            <span className="price">{`$${parseFloat(price[6]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                    </div>

                    <div className="header-generic" id="subheader">A LA CARTE BOXES</div>

                    <div className="option-generic">

                        <div className="option-titles">SIDES</div>

                        <div className="option-generic">
                            <span className="calories-count">Medium</span>
                            <span className="price">{`$${parseFloat(price[12]).toFixed(2)}`}</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Large</span>
                            <span className="price">{`$${parseFloat(price[13]).toFixed(2)}`}</span>
                        </div>

                        <div className="option-titles">ENTREES</div>

                        <div className="option-generic">
                            <span className="calories-count">Small</span>
                            <span className="price">{`$${parseFloat(price[3]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Medium</span>
                            <span className="price">{`$${parseFloat(price[4]).toFixed(2)}`}</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="calories-count">Large</span>
                            <span className="price">{`$${parseFloat(price[5]).toFixed(2)}`}</span>
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

                    <div className="header-generic" id="subheader">APPETIZERS AND MORE</div>

                    <div className="option-generic">
                        <span className="option-titles">CHICKEN EGG ROLL</span>
                        <span className="calories-count">200</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">VEGETABLE SPRING ROLL</span>
                        <span className="calories-count">240</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">CREAM CHEESE RANGOON</span>
                        <span className="calories-count">190</span>
                        <span className="cal">cal</span>
                    </div>

                    <div className="option-generic">
                        <span className="option-titles">APPLE PIE ROLL</span>
                        <span className="calories-count">150</span>
                        <span className="cal">cal</span>
                    </div>

                </div>

            </div>
        </>
    );
}
