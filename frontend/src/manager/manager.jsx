import ManagerGreeting from "./greetMessage/managerGreeting.jsx";
import PageHeader from "./header/pageHeader.jsx";
import CurrEmployees from "./clockedInEmployees/currEmployees.jsx";


function manager() {
    return (
        <>
            <PageHeader />
            <ManagerGreeting />
            <div id="grid-container">
                <div className="grid-item">
                    <CurrEmployees/>
                </div>
            </div>
            
        </>
    );
};

export default manager;