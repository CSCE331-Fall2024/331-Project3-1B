import './salesOrderHistory.css';
import PageHeader from '../header/pageHeader.jsx';
import { useEffect, useState } from 'react';

function SalesOrderHistory() {
    const [zTotalOrders, setZTotalOrders] = useState(null);
    const [zTotalSales, setZTotalSales] = useState(null);
    const [zTotalItems, setZTotalItems] = useState(null);
    
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const createZReport = async () => {
        const now = new Date();
    
        // Set start time to 00:00:00
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const starttime = formatDateTime(startOfDay);
        
        // Set end time to 23:59:59
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const endtime = formatDateTime(endOfDay);
        try {
            const result = await fetch(`http://localhost:3001/manager/zReport?starttime='${starttime}'&endtime='${endtime}'`)
            const data = await result.json()
            setZTotalSales(data.totalSales);
            setZTotalOrders(data.totalOrders);
            setZTotalItems(data.itemCount);
        } catch (error) {
            console.error("Could not get zReport data");
        }
    };

    const createXReport = async () => {
        
    };

    return (
        <>
            <PageHeader />
            <h1 id='sales-title'>Sales Order History</h1>
            <div id='sales-info-container'>
                <div id='left-column'>
                    <button className='report-btn' onClick={ createXReport }>X Report</button>
                    <button className='report-btn' onClick={ createZReport }>Z Report</button>
                </div>
                <div id='right-column'>{zTotalOrders}, {zTotalSales}, {zTotalItems}</div>
            </div>
        </>
    );
};

export default SalesOrderHistory