import "./zReportGraph.css";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { SpinnerCircular } from "spinners-react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    scales,
} from "chart.js";

// Register components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ZReportGraph = () => {
    const [zData, setZData] = useState({});
    const [showGraph, setShowGraph] = useState(false);
    // use effect for data fetching
    useEffect(() => {
        setShowGraph(false);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://three31-project3-1b-backend.onrender.com/manager/zReport`
                );
                const result = await response.json();
                setZData(result);
                setShowGraph(true);
            } catch (error) {
                console.error("Error getting data for z report graph");
            }
        };
        fetchData();
    }, []);

    const data = {
        labels: Object.keys(zData),
        datasets: [
            {
                data: Object.values(zData),
                label: "Sales (cumulative)",
                borderColor: "rgba(255, 99, 132, 1)", // Line color
                backgroundColor: "rgba(255, 99, 132, 1)", // Fill color
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
                    text: "Cumulative Sales ($)",
                },
            },
        },
    };

    return (
        <>
            {showGraph ? (
                <div>
                    <h3>Z Report:</h3>
                    <h5>Between Opening Hours 10am-9pm Today:</h5>
                    <div className="linechart-container">
                        <Line data={data} options={options} />
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="loading-text">
                        Loading Z Report{" "}
                        <SpinnerCircular
                            size={15}
                            thickness={400}
                            color="#d61927"
                            secondaryColor="#fff"
                        />
                    </h3>
                </div>
            )}
        </>
    );
};

export default ZReportGraph;
