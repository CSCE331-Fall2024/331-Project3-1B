import React, { useState } from "react";
import "./employeeContainer.css";
import EmployeeCard from "./employeeCard.jsx";

function EmployeeContainer() {
    
    // temporary data
    const initialEmployees = ["Jason", "Kaiqi", "Nick", "Zach", "Nathan"];
    const initialPositions = ["Cashier", "Manager", "Cashier", "Cashier", "Cashier"];
    const initialEmails = initialEmployees.map(employee => `${employee.toLowerCase()}@gmail.com`);

    const [employees, setEmployees] = useState(initialEmployees);
    const [positions, setPositions] = useState(initialPositions);
    const [emails, setEmails] = useState(initialEmails);

    console.log(initialEmployees);
    function removeEmployee(index) {
        setEmployees(employees.filter((_, i) => { return i != index }));
        setPositions(positions.filter((_, i) => { return i != index }));
        setEmails(emails.filter((_, i) => {return i != index }));
    };
    console.log(employees);
    return (
        <>
            <div id="employee-container">
                <EmployeeCard name={"Email: "} position={"Position: "} email={"Name: "} />
                {employees.map((employee, index) => {
                    return <EmployeeCard name={employee} position={positions[index]} email={emails[index]} key={index} removeEmployee = {() => removeEmployee(index)}/>
                })}
            </div>
        </>
    );
};

export default EmployeeContainer;