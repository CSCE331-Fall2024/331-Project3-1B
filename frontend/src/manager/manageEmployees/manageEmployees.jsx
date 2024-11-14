import "./manageEmployees.css";
import PageHeader from "../header/pageHeader";"../header/pageHeader.jsx";
import EmployeeContainer from "./employeeCard/employeeContainer.jsx";

// manager view screen that shows all employee info
function ManageEmployees () {
        return (
            <>
                <div id="manage-employees-container">
                    <PageHeader />
                    <h1 id="manage-employees-heading">Manage Employees:</h1>
                    <EmployeeContainer />
                </div>
            </>
        );
};

export default ManageEmployees;

