import ManagerGreeting from "./greetMessage/managerGreeting.jsx";
import PageHeader from "./header/pageHeader.jsx";
import CurrEmployees from "./clockedInEmployees/currEmployees.jsx";
import "./manager.css";
import RecentOrders from "./recentOrders/recentOrders.jsx";


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

            </div>
            
        </>
    );
};

export default manager;