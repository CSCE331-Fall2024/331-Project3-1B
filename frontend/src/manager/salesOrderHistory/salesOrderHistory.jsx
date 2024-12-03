import './salesOrderHistory.css';
import PageHeader from '../header/pageHeader.jsx';
import { useEffect, useState } from 'react';


function SalesOrderHistory() {
    const [zTotalOrders, setZTotalOrders] = useState(null);
    const [zTotalSales, setZTotalSales] = useState(null);
    const [zTotalItems, setZTotalItems] = useState(null);
    const [xReport, setXReport] = useState([]);
    const [inventoryReport, setInventoryReport] = useState({
        x: null,
        y: null,
    })
    const [inventoryReportTime, setInventoryReportTime] = useState({
        start: '',
        end: '',
    })
    
    let todayStartTime;
    let todayEndTime;

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function getDate() {
        const now = new Date();
    
        // Set start time to 00:00:00
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        todayStartTime = formatDateTime(startOfDay);
        
        // Set end time to 23:59:59
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        todayEndTime = formatDateTime(endOfDay);
    }

    const createZReport = async () => {
        getDate();
        try {
            if (zTotalItems) {
                setZTotalItems(null);
                setZTotalOrders(null);
                setZTotalSales(null);
            } else {
                const result = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/zReport?starttime='${todayStartTime}'&endtime='${todayEndTime}'`);
                const data = await result.json()
                setZTotalSales(data.totalSales);
                setZTotalOrders(data.totalOrders);
                setZTotalItems(data.itemCount);
                console.log(zTotalOrders, zTotalSales, zTotalItems);
            }
        } catch (error) {
            console.error("Could not get zReport data");
        }
    };

    const createXReport = async () => {
        getDate();
        try {
            if (xReport.length !== 0) {
                setXReport([]);
            } else {
                const result = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/xReport?starttime='${todayStartTime}'&endtime='${todayEndTime}'`);
                const data = await result.json();
                setXReport(data);
            }
        } catch (error) {
            console.error('Error in creating X report');
        }
    };

    const createInventoryReport = async (startTime, endTime) => {
        try {
            const result = await fetch(`http://localhost:3001/manager/getInventoryUsage?startTime=${startTime}&endTime=${endTime}`);
            const data = await result.json();
            // add data to state variable
        } catch (error) {
            console.error('Could not create inventory report');
        }
    }

    const handleInvDateChange = (e) => {
        const { name, value } = e.target;
        setInventoryReportTime(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <PageHeader />
            <h1 id='sales-title'>Sales Order History</h1>
            <div id='sales-info-container'>
                <div id='btn-container'>
                    <div>
                        <button className='report-btn' onClick={ createXReport }>X Report</button>
                        <button className='report-btn' onClick={ createZReport }>Z Report</button>
                    </div>

                    <div>
                        <button className='report-btn' onClick={ createInventoryReport }>Inventory Usage Report</button>
                        <input className='date-input' name='start' value={ inventoryReportTime.start } type='text' placeholder='Start Time' onChange={ handleInvDateChange }/>
                        <input className='date-input' name='end' value={ inventoryReportTime.end } type='text' placeholder='End Time' onChange={ handleInvDateChange }/>
                        
                    </div>
                    
                </div>
                <div id='report-container'>
                    <div>
                        {xReport.length > 0 ? 
                            <div className='indiv-report'>
                                <h3>X Report: </h3>
                                <h5>Between Opening Hours 10am-9pm:</h5>
                                <table>
                                    <tr>
                                        <th className='table-item'>Time Frame</th>
                                        <th className='table-item'>Total Orders</th>
                                        <th className='table-item'>Total Items</th>
                                        <th className='table-item'>Total Sales</th>
                                    </tr>
                                    { xReport.map((val, index) => {
                                        return (
                                            <tr className='data-row' key={index}>
                                                <td>{ val.start_time } - { val.end_time }</td>
                                                <td>{ val.total_orders }</td>
                                                <td>{ val.total_items }</td>
                                                <td>${ val.total_cost }</td>
                                            </tr>
                                        )
                                    }) }
                                </table>
                            </div>
                            : ''
                        }
                        
                    </div>

                    <div>
                        {zTotalItems != null ? 
                        <div className='indiv-report'>
                            <h3>Z Report:</h3>
                            <p>There were {zTotalOrders} total orders totaling ${zTotalSales} between {todayStartTime} and {todayEndTime} - {zTotalItems} total items sold</p>
                        </div>
                        : ''}
                    </div>


                </div>
            </div>
        </>
    );
};

export default SalesOrderHistory