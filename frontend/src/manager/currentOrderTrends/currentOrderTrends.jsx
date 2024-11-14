import React from 'react';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import "./currentOrderTrends.css";

// creates a container that holds the current order trends. Shows the number of each item ordered today
// creates a pie chart showing combo trends today
function OrderTrends() {
    const [comboData, setComboData] = useState({});
    useEffect(() => {
        fetch('http://localhost:3001/manager/combos_today')
        .then(data => data.json())
        .then(data => setComboData(data))
        .catch(err => console.error("cannot get combo data"));
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
            </div>


        </>
    );
}

export default OrderTrends;