import "./employeeContainer.css";
import EmployeeCard from "./employeeCard.jsx";

function EmployeeContainer() {

    // temporary data
    let employees = ["Jason", "Kaiqi", "Nick", "Zach", "Nathan"];
    let positions = ["Cashier", "Manager", "Cashier", "Cashier", "Cashier"];
    let emails = employees.map(employee => `${employee.toLowerCase()}@gmail.com`);

    return (
        <>
            <div id="employee-container">
                {employees.map((employee, index) => {
                    return <EmployeeCard name={employee} position={positions[index]} email={emails[index]} key={index} />
                })}
            </div>
        </>
    );
};

export default EmployeeContainer;