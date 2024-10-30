import "./currEmployees.css";
import CurrEmployeeItem from "./currEmployeeItem.jsx";


// creates a container that holds all the employees that are currently clocked in
function CurrEmployees() {
    return (    
        <>
            <div id="curr-employees-container">
            <h2>Clocked In Employees:</h2>
                <CurrEmployeeItem employeeName="John Doe" />
                <CurrEmployeeItem employeeName="Jane Doe" />
                <CurrEmployeeItem employeeName="John Smith" />
                <CurrEmployeeItem employeeName="Jane Smith" />
                <CurrEmployeeItem employeeName="John Johnson" />
                <CurrEmployeeItem employeeName="Jane Johnson" />
            </div>
        </>
    );

};

export default CurrEmployees;