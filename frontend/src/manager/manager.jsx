import "./manager.css";
import ManagerGreeting from "./greetMessage/managerGreeting.jsx";
import PageHeader from "./header/pageHeader.jsx";
import CurrEmployees from "./clockedInEmployees/currEmployees.jsx";
import RecentOrders from "./recentOrders/recentOrders.jsx";
import CurrentOrderTrends from "./currentOrderTrends/currentOrderTrends.jsx";


// the main customer component that will be rendered when the manager visits the manager view
function manager() {
    return (
        <>
            {/* navigation task bar the the top of the page */}
            <PageHeader />

            {/* renders the manager greeting message */}
            <ManagerGreeting />

            {/* creates a 3x1 grid layout for the manager view */}
            <div id="grid-container">

                <div className="grid-item">
                    {/* renders the current employees that are clocked in */}
                    <CurrEmployees />
                </div>

                <div className="grid-item">
                    {/* renders the recent orders */}
                    <RecentOrders />
                </div>

                <div className="grid-item">
                    {/* renders the current order trends of the day */}
                    <CurrentOrderTrends />
                </div>

            </div>
            
        </>
    );
};

export default manager;