import "./salesOrderHistory.css";
import PageHeader from "../header/pageHeader.jsx";
import ZReportGraph from "./zReportGraph/zReportGraph.jsx";
import InventoryGraph from "./inventoryGraph/inventoryGraph.jsx";
import SalesTrendsGraph from "./salesTrendsGraph/salesTrendsGraph.jsx";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";

function SalesOrderHistory() {
    const [displayZ, setDisplayZ] = useState(false);
    const [xReport, setXReport] = useState([]);
    const [showXReport, setShowXReport] = useState(false);
    const [loadingXReport, setLoadingXReport] = useState(false);
    const [displayInventory, setDisplayInventory] = useState(false);
    const [displayMenuTrends, setDisplayMenuTrends] = useState(false);
    const [inventoryReportTime, setInventoryReportTime] = useState({
        start: "",
        end: "",
    });
    const [menuTrendsTime, setMenuTrendsTime] = useState({
        start: "",
        end: "",
    });

    let todayStartTime;
    let todayEndTime;
    let todayExactTime;

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function getDate() {
        const now = new Date();

        // Set start time to 00:00:00
        const startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0
        );
        todayStartTime = formatDateTime(startOfDay);

        // Set end time to 23:59:59
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59
        );
        todayEndTime = formatDateTime(endOfDay);

        // Set exact time to time and date right now
        todayExactTime = formatDateTime(new Date());
    }

    const createZReport = () => {
        setDisplayZ(!displayZ);
    };

    const createXReport = async () => {
        setLoadingXReport(true); // Start loading
        setShowXReport(false); // Hide report initially
        getDate();
        try {
            if (xReport.length !== 0) {
                setXReport([]);
            } else {
                const result = await fetch(
                    `http://localhost:${
                        import.meta.env.VITE_BACKEND_PORT
                    }/manager/xReport?starttime='${todayStartTime}'&endtime='${todayEndTime}'`
                );
                const data = await result.json();
                setXReport(data);
            }
            setShowXReport(true);
        } catch (error) {
            console.error("Error in creating X report");
        } finally {
            setLoadingXReport(false); // End loading
        }
    };

    const handleInvDateChange = (e) => {
        const { name, value } = e.target;
        setInventoryReportTime((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleMenuReportChange = (e) => {
        const { name, value } = e.target;
        setMenuTrendsTime((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const createInventoryReport = () => {
        if (displayInventory) {
            setDisplayInventory(false);
            setInventoryReportTime({
                start: "",
                end: "",
            });
        } else if (
            !displayInventory &&
            inventoryReportTime.start &&
            inventoryReportTime.end
        ) {
            setDisplayInventory(true);
        }
    };

    const createMenuTrendsReport = () => {
        if (displayMenuTrends) {
            setDisplayMenuTrends(false);
            setMenuTrendsTime({
                start: "",
                end: "",
            });
        } else if (
            !displayMenuTrends &&
            menuTrendsTime.start &&
            menuTrendsTime.end
        ) {
            setDisplayMenuTrends(true);
        }
    };

    const defaultOptionInventory = (e) => {
        const { name } = e.target;
        getDate();
        const now = new Date();
        let startTime;
        switch (name) {
            case "minute":
                startTime = formatDateTime(
                    new Date(now.getTime() - 15 * 60000)
                ); // Subtract 15 minutes
                break;
            case "hour":
                startTime = formatDateTime(
                    new Date(now.getTime() - 60 * 60000)
                ); // Subtract 1 hour
                break;
            case "day":
                startTime = formatDateTime(
                    new Date(now.getTime() - 24 * 60 * 60000)
                ); // Subtract 1 day
                break;
        }
        setInventoryReportTime({
            start: startTime,
            end: todayExactTime,
        });
    };

    const defaultOptionSales = (e) => {
        const { name } = e.target;
        getDate();
        const now = new Date();
        let startTime;
        switch (name) {
            case "minute":
                startTime = formatDateTime(
                    new Date(now.getTime() - 15 * 60000)
                ); // Subtract 15 minutes
                break;
            case "hour":
                startTime = formatDateTime(
                    new Date(now.getTime() - 60 * 60000)
                ); // Subtract 1 hour
                break;
            case "day":
                startTime = formatDateTime(
                    new Date(now.getTime() - 24 * 60 * 60000)
                ); // Subtract 1 day
                break;
        }
        setMenuTrendsTime({
            start: startTime,
            end: todayExactTime,
        });
    };

    return (
        <>
            <PageHeader />
            <h1 id="sales-title">Sales Reports</h1>
            <div id="sales-info-container">
                <div id="btn-container">
                    <div>
                        <button
                            className="report-btn"
                            onClick={() => {
                                createXReport();
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            X Report
                        </button>
                        <button
                            className="report-btn"
                            onClick={() => {
                                createZReport();
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            Z Report
                        </button>
                    </div>

                    <div>
                        <button
                            className="report-btn"
                            onClick={() => {
                                createInventoryReport();
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            Inventory Usage Report
                        </button>
                        <input
                            className="date-input"
                            name="start"
                            value={inventoryReportTime.start}
                            type="text"
                            placeholder="Start Time"
                            onChange={handleInvDateChange}
                        />
                        <input
                            className="date-input"
                            name="end"
                            value={inventoryReportTime.end}
                            type="text"
                            placeholder="End Time"
                            onChange={handleInvDateChange}
                        />
                        <button
                            className="default-option-btn"
                            name="minute"
                            onClick={(e) => {
                                defaultOptionInventory(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            15 Minutes
                        </button>
                        <button
                            className="default-option-btn"
                            name="hour"
                            onClick={(e) => {
                                defaultOptionInventory(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            1 Hour
                        </button>
                        <button
                            className="default-option-btn"
                            name="day"
                            onClick={(e) => {
                                defaultOptionInventory(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            1 Day
                        </button>
                    </div>

                    <div>
                        <button
                            className="report-btn"
                            onClick={() => {
                                createMenuTrendsReport();
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            Sales History Report
                        </button>
                        <input
                            className="date-input"
                            name="start"
                            value={menuTrendsTime.start}
                            placeholder="Start Time"
                            onChange={handleMenuReportChange}
                        />
                        <input
                            className="date-input"
                            name="end"
                            value={menuTrendsTime.end}
                            placeholder="End Time"
                            onChange={handleMenuReportChange}
                        />
                        <button
                            className="default-option-btn"
                            name="minute"
                            onClick={(e) => {
                                defaultOptionSales(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            15 Minutes
                        </button>
                        <button
                            className="default-option-btn"
                            name="hour"
                            onClick={(e) => {
                                defaultOptionSales(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            1 Hour
                        </button>
                        <button
                            className="default-option-btn"
                            name="day"
                            onClick={(e) => {
                                defaultOptionSales(e);
                                playSound("/Sounds/ButtonSound.mp3");
                            }}
                        >
                            1 Day
                        </button>
                    </div>
                </div>
                <div id="report-container">
                    <div>
                        {loadingXReport ? (
                            <div className="loading-text">
                                <h3>
                                    Loading X Report{" "}
                                    <SpinnerCircular
                                        size={15}
                                        thickness={400}
                                        color="#d61927"
                                        secondaryColor="#fff"
                                    />
                                </h3>
                            </div>
                        ) : (
                            showXReport &&
                            xReport.length > 0 && (
                                <div className="indiv-report">
                                    <h3>X Report: </h3>
                                    <h5>
                                        Between Opening Hours 10am-9pm Today:
                                    </h5>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="table-item">
                                                    Time Frame
                                                </th>
                                                <th className="table-item">
                                                    Total Orders
                                                </th>
                                                <th className="table-item">
                                                    Total Items
                                                </th>
                                                <th className="table-item">
                                                    Total Sales
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {xReport.map((val, index) => (
                                                <tr
                                                    className="data-row"
                                                    key={index}
                                                >
                                                    <td>
                                                        {val.start_time} -{" "}
                                                        {val.end_time}
                                                    </td>
                                                    <td>{val.total_orders}</td>
                                                    <td>{val.total_items}</td>
                                                    <td>${val.total_cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )}
                    </div>

                    <div>
                        {displayZ ? (
                            <div className="indiv-report">
                                <ZReportGraph />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div>
                        {displayInventory ? (
                            <InventoryGraph
                                startTime={inventoryReportTime.start}
                                endTime={inventoryReportTime.end}
                            />
                        ) : (
                            ""
                        )}
                    </div>

                    <div>
                        {displayMenuTrends ? (
                            <SalesTrendsGraph
                                startTime={menuTrendsTime.start}
                                endTime={menuTrendsTime.end}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesOrderHistory;
