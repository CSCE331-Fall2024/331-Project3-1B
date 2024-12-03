import './zReportGraph.css';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, scales } from 'chart.js';

// Register components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ZReportGraph = () => {
    const [zData, setZData] = useState({});

    // use effect for data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/zReport`);
                const result = await response.json();
                setZData(result);
            } catch (error) {
                console.error('Error getting data for z report graph');
            }
        };
        fetchData();
    }, []);

    const data = {
        labels: Object.keys(zData),
        datasets: [
            {
                data: Object.values(zData),
                label: 'Hours of the Day',
                borderColor: 'rgba(255, 99, 132, 1)', // Line color
                backgroundColor: 'rgba(255, 99, 132, 1)', // Fill color
                fill: true,
            },
        ],
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
                title: {
                    display: true,
                    text: 'Cumulative Sales ($)',
                },
            },
        },
    };
    
    return (
        <div className='linechart-container'>
            <Line data={data} options={options} />
        </div>
    );
    };

export default ZReportGraph;