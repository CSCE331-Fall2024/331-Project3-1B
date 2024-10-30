import "./currEmployees.css";
import CurrEmployeeItem from "./currEmployeeItem.jsx";

function CurrEmployees() {
    return (    
        <>
            <div id="curr-employees-container">
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