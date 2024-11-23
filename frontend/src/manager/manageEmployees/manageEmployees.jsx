import "./manageEmployees.css";
import PageHeader from "../header/pageHeader";"../header/pageHeader.jsx";
import EmployeeContainer from "./employeeCard/employeeContainer.jsx";
import { useNavigate } from "react-router-dom";

// manager view screen that shows all employee info

function ManageEmployees () {
    const navigate = useNavigate();
    const addEmployeeClick = () => {
        navigate('/manager/employees/add_employee');
    };
    const editEmployeeClick = () => {
        navigate('/manager/employees/edit_employee');
    };

    return (
        <>
            <PageHeader />
            <div id="manage-employees-heading">
                <h1 id="manage-employees-title">Manage Employees:</h1>
                <div id="btn-container">
                    <button className="employee-btn" onClick={ editEmployeeClick }>Edit Employee</button>
                    <button className="employee-btn" onClick={ addEmployeeClick }>Add Employee</button>
                </div>
            </div>
            <EmployeeContainer />
        </>
    );
};

export default ManageEmployees;

