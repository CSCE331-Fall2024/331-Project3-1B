import './salesOrderHistory.css';
import PageHeader from '../header/pageHeader.jsx';

function SalesOrderHistory() {

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const createZReport = () => {
        const now = new Date();
    
        // Set start time to 00:00:00
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const starttime = formatDateTime(startOfDay);
        
        // Set end time to 23:59:59
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const endtime = formatDateTime(endOfDay);
        const zReportQuery1 = "SELECT SUM(price) FROM sales_order_history WHERE Date_time_ordered BETWEEN " + starttime + " AND " + endtime + ";";
        const zReportQuery2 = "SELECT COUNT(price) FROM sales_order_history WHERE Date_time_ordered BETWEEN " + starttime + " AND " + endtime + ";";
        
        
    };

    return (
        <>
            <PageHeader />
            <h1 id='sales-title'>Sales Order History</h1>
            <div id='sales-info-container'>
                <div id='left-column'>
                    <button className='report-btn'>X Report</button>
                    <button className='report-btn'>Z Report</button>
                </div>
                <div id='right-column'>right</div>
            </div>
        </>
    );
};

export default SalesOrderHistory