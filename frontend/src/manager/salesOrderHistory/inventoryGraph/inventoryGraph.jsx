import "./inventoryGraph.css";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { SpinnerCircular } from "spinners-react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const InventoryGraph = ({ startTime, endTime }) => {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        setShowGraph(false);
        const fetchData = async () => {
            try {
                const result = await fetch(
                    `https://three31-project3-1b-backend.onrender.com/manager/getInventoryUsage?startTime=${startTime}&endTime=${endTime}`
                );
                const data = await result.json();
                const itemNames = data.map((item) => item[0]);
                const itemQuantities = data.map((item) => item[1]);
                setItems(itemNames);
                setQuantities(itemQuantities);
                setShowGraph(true);
            } catch (error) {
                console.error("Error fetching data for inventory graph", error);
            }
        };

        fetchData();
    }, [startTime, endTime]); // dependency array to refetch data when start and end time change

    const data = {
        labels: items,
        datasets: [
            {
                label: "Quantities",
                data: quantities,
                backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red color
                borderColor: "rgba(255, 99, 132, 1)", // Light red border color
                borderWidth: 1,
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
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Quantity",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Items",
                },
            },
        },
    };

    return (
        <>
            {showGraph ? (
                <div id="barchart-container">
                    <h3>Inventory Usage Report:</h3>
                    <Bar data={data} options={options} />
                </div>
            ) : (
                <div>
                    <h3 className="loading-text">
                        Loading Inventory Usage Report{" "}
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

export default InventoryGraph;
