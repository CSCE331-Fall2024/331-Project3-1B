import "./manager.css";
import ManagerGreeting from "./greetMessage/managerGreeting.jsx";
import PageHeader from "./header/pageHeader.jsx";
import CurrEmployees from "./clockedInEmployees/currEmployees.jsx";
import RecentOrders from "./recentOrders/recentOrders.jsx";
import CurrentOrderTrends from "./currentOrderTrends/currentOrderTrends.jsx";

function manager() {
    return (
        <>
            <PageHeader />
            <ManagerGreeting />
            <div id="grid-container">

                <div className="grid-item">
                    <CurrEmployees />
                </div>

                <div className="grid-item">
                    <RecentOrders />
                </div>

                <div className="grid-item">
                    <CurrentOrderTrends />
                </div>

            </div>
            
        </>
    );
};

export default manager;