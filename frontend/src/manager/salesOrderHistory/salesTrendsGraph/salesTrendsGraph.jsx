import './salesTrendsGraph.css';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SalesTrendsGraph = ({startTime, endTime}) => {
    const [salesData, setSalesData] = useState({
        menuItem: null,
        quantity: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/get_sales_report?startTime=${startTime}&endTime=${endTime}`);
            const data = await result.json();
            setSalesData({
                menuItem: data.item_name,
                quantity: data.item_quantity,
            });
        };
        fetchData();
    }, [startTime, endTime]);

    const data = {
        labels: salesData.menuItem,
        datasets: [
            {
                label: 'Quantities',
                data: salesData.quantity,
                borderWidth: 1,
                backgroundColor: 'rgba(225, 99, 90, 0.2)',
                borderColor: 'rgba(225, 99, 90, 1)',

            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Items',
                },
            },
        },
    };

    return (
        <div id='barchart-container'>
            <h3>Sales Trend Report:</h3>
            <Bar data={data} options={options} />
        </div>
    )

};


export default SalesTrendsGraph;