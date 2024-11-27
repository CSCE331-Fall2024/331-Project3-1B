import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import "./currentOrderTrends.css";

// creates a container that holds the current order trends. Shows the number of each item ordered today
// creates a pie chart showing combo trends today

function OrderTrends() {
    const [comboData, setComboData] = useState({});

    const getComboData = async (button) => {
        try {
            const savedData = localStorage.getItem('comboData');
            if (savedData != null && button === false) {
                setComboData(JSON.parse(savedData)); // convert a JSON to a javascript object
            } else {
                const response = await fetch('http://localhost:3001/manager/combos_today');
                const data = await response.json();
                setComboData(data);
                localStorage.setItem('comboData', JSON.stringify(data)); // convert javascript obj to json
            }
        } catch (error) {
            console.error("cannot get combo data for pie chart", error);
        }
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
    useEffect(() => {
        getComboData(false);
    }, []);

    return (
        <>
            <div id='order-trends-container'>
                <h2 id='trends-title'>Today's Order Trends</h2>
                <div id='pie-container'>
                    <Pie 
                        data={{
                            labels: Object.keys(comboData),
                            datasets: [{
                                data: Object.values(comboData),
                                backgroundColor: [
                                '#FF6384', // Red
                                '#36A2EB', // Blue
                                '#FFCE56', // Yellow
                                '#4BC0C0', // Teal
                                '#9966FF', // Purple
                                '#FF9F40', // Orange
                                '#FF33Fc', // Pink
                                ]
                            }]
                        }}
                    />
                </div>
                <button id='refresh-chart-btn' onClick={ () => {getComboData(true);playSound('../../../public/Sounds/ButtonSound.mp3')} }>Refresh</button>
            </div>


        </>
    );
}

export default OrderTrends;