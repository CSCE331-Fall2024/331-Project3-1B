import './salesOrderHistory.css';
import PageHeader from '../header/pageHeader.jsx';
import { useEffect, useState } from 'react';

function SalesOrderHistory() {
    const [zTotalOrders, setZTotalOrders] = useState(null);
    const [zTotalSales, setZTotalSales] = useState(null);
    const [zTotalItems, setZTotalItems] = useState(null);
    const [xReport, setXReport] = useState([]);
    let starttime;
    let endtime;

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
        starttime = formatDateTime(startOfDay);
        
        // Set end time to 23:59:59
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        endtime = formatDateTime(endOfDay);
    }

    const createZReport = async () => {
        getDate();
        try {
            const result = await fetch(`http://localhost:3001/manager/zReport?starttime='${starttime}'&endtime='${endtime}'`);
            const data = await result.json()
            setZTotalSales(data.totalSales);
            setZTotalOrders(data.totalOrders);
            setZTotalItems(data.itemCount);
            console.log(zTotalOrders, zTotalSales, zTotalItems);
        } catch (error) {
            console.error("Could not get zReport data");
        }
    };

    const createXReport = async () => {
        getDate();
        try {
            const result = await fetch(`http://localhost:3001/manager/xReport?starttime='${starttime}'&endtime='${endtime}'`);
            const data = await result.json();
            setXReport(data);
        } catch (error) {
            console.error('Error in creating X report');
        }
    };

    return (
        <>
            <PageHeader />
            <h1 id='sales-title'>Sales Order History</h1>
            <div id='sales-info-container'>
                <div id='btn-container'>
                    <button className='report-btn' onClick={ createXReport }>X Report</button>
                    <button className='report-btn' onClick={ createZReport }>Z Report</button>
                </div>
                <div id='report-container'>
                    <p>{zTotalOrders}, {zTotalSales}, {zTotalItems}</p>
                    <div>
                        {xReport.map((report, index) => <p key={index}>{report}</p>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesOrderHistory