import "./weatherDisplay.css";
import { useState, useEffect } from "react";
/**
 * gets the current weather from api and interprets it for managerial use
 * @returns {HTML} weather component
 */
function WeatherDisplay() {
    const [currTemp, setCurrTemp] = useState(null);
    const [currWeatherCondition, setCurrWeatherCondition] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const query = 'https://api.openweathermap.org/data/2.5/weather?lat=30.63&lon=-96.33&appid=75fb784ce18406644d9b2c4972aa2476';
            try {
                const result = await fetch(query);
                const data = await result.json();
                setCurrTemp(data.main.temp);
                setCurrWeatherCondition(data.weather[0].main);
            } catch (error) {
                console.error("Could not get weather data");
            }
        };
    
        getWeather();
    }, []);
    const kelvinToFarenheit = (kelvin) => {
        const farenheit = (kelvin - 273.15) * 9/5 + 32;
        return farenheit.toFixed(1);
    };

    const getWeatherMessage = () => {
        if (parseFloat(kelvinToFarenheit(currTemp)) < 50 || parseFloat(kelvinToFarenheit(currTemp)) > 100 || currWeatherCondition != 'Clear' && currWeatherCondition != 'Clouds') {
            return 'Unfavorable weather expected today. Expect less customers than usual.';
        }
        return 'Favorable weather conditions today! Expect the usual amount of customers.';
    };

    return (    
        <div id="weather-container">
            <h2 id="weather-title">Today's Weather</h2>
            <div id="weather-info-container">
                <h3>Current Temperature:{' '}{kelvinToFarenheit(currTemp)}°F</h3>
                <h3>Current Weather:{' '}{currWeatherCondition}</h3>
                <p>{getWeatherMessage()}</p>                
            </div>
            
        </div>
    );
};

export default WeatherDisplay;
