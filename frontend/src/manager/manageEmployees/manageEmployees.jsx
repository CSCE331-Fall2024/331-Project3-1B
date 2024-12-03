import "./manageEmployees.css";
import PageHeader from "../header/pageHeader";"../header/pageHeader.jsx";
import EmployeeContainer from "./employeeCard/employeeContainer.jsx";
import { useNavigate } from "react-router-dom";

// manager view screen that shows all employee info
/**
 * manager view screen that shows all employee info
 * @returns {HTML} employee manager view screen
 */
function ManageEmployees () {
    const navigate = useNavigate();
    const addEmployeeClick = () => {
        navigate('/manager/employees/add_employee');
    };
    const editEmployeeClick = () => {
        navigate('/manager/employees/edit_employee');
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    return (
        <>
            <PageHeader />
            <div id="manage-employees-heading">
                <h1 id="manage-employees-title">Manage Employees:</h1>
                <div id="emp-btn-container">
                    <button className="employee-btn" onClick={() => {editEmployeeClick();playSound('/Sounds/ButtonSound.mp3')}}>Edit Employee</button>
                    <button className="employee-btn" onClick={() => {addEmployeeClick();playSound('/Sounds/ButtonSound.mp3')}}>Add Employee</button>
                </div>
            </div>
            <EmployeeContainer />
        </>
    );
};

export default ManageEmployees;

