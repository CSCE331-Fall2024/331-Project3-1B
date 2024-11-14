import React from 'react';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import "./currentOrderTrends.css";

// creates a container that holds the current order trends. Shows the number of each item ordered today
// data is temporary and will be replaced with actual data
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

// creates a container that holds the current order trends. Shows the number of each item ordered today
// data is temporary and will be replaced with actual data
// function OrderTrends() {

//     return (
//         <div className="piechart-container">
//             <h2 id="trends-title">Today's Order Trends</h2>
//             <div id="item-grid">
//                 <div className="item">
//                     <div className="item-name">Bowl</div>
//                     <div className="item-value">50 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">Plate</div>
//                     <div className="item-value">45 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">Bigger Plate</div>
//                     <div className="item-value">30 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">Cub Meal</div>
//                     <div className="item-value">20 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">A La Carte Small</div>
//                     <div className="item-value">15 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">A La Carte Medium</div>
//                     <div className="item-value">10 ct</div>
//                 </div>
//                 <div className="item">
//                     <div className="item-name">A La Carte Large</div>
//                     <div className="item-value">5 ct</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderTrends;
