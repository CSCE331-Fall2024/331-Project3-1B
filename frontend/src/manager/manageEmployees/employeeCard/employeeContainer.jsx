import React, { useState } from "react";
import "./employeeContainer.css";
import EmployeeCard from "./employeeCard.jsx";

function EmployeeContainer() {
    
    // temporary data
    const initialEmployees = ["Jason", "Kaiqi", "Nick", "Zach", "Nathan"];
    const initialId = [1, 2, 3, 4, 5];
    const initialPositions = ["Cashier", "Manager", "Cashier", "Cashier", "Cashier"];
    const initialEmails = initialEmployees.map(employee => `${employee.toLowerCase()}@gmail.com`);

    const [employees, setEmployees] = useState(initialEmployees);
    const [id, setId] = useState(initialId);
    const [positions, setPositions] = useState(initialPositions);
    const [emails, setEmails] = useState(initialEmails);

    console.log(initialEmployees);
    function removeEmployee(index) {
        setEmployees(employees.filter((_, i) => { return i != index }));
        setId(id.filter((_, i) => { return i != index }));
        setPositions(positions.filter((_, i) => { return i != index }));
        setEmails(emails.filter((_, i) => {return i != index }));
    };
    console.log(employees);
    return (
        <>
            <div id="employee-container">
                <div id="employee-table-heading">
                    <h2>Name:</h2>
                    <h2>ID:</h2>
                    <h2>Position:</h2>
                    <h2>Email:</h2>
                </div>
                {employees.map((employee, index) => {
                    return <EmployeeCard name={employee} id={id[index]} position={positions[index]} email={emails[index]} key={index} removeEmployee = {() => removeEmployee(index)}/>
                })}
            </div>
        </>
    );
};

export default EmployeeContainer;