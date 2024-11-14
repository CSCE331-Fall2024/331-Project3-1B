import "./manageEmployees.css";
import PageHeader from "../header/pageHeader";"../header/pageHeader.jsx";
import EmployeeContainer from "./employeeCard/employeeContainer.jsx";

// manager view screen that shows all employee info
function ManageEmployees () {
        return (
            <>
                    <PageHeader />
                    <div id="manage-employees-heading">
                        <h1 id="manage-employees-title">Manage Employees:</h1>
                        <button id="add-employee-btn">Add Employee</button>
                    </div>
                    <EmployeeContainer />
            </>
        );
};

export default ManageEmployees;

