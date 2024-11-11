import React, { useState, useEffect } from "react";
import "./employeeContainer.css";
import EmployeeCard from "./employeeCard.jsx";

function EmployeeContainer() {

    useEffect(() => {
        fetch('http://localhost:3001/manager/get_all_employees')
            .then(response => response.json())
            .then(data => {
                const employeeNames = data.map(employee => employee.full_name);
                const employeeIds = data.map(employee => employee.employeeid);
                const employeePositions = data.map(employee => employee.position);
                const employeeEmails = data.map(employee => employee.email);

                setEmployees(employeeNames);
                setId(employeeIds);
                setPositions(employeePositions);
                setEmails(employeeEmails);
            })
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);


    const [employees, setEmployees] = useState([]);
    const [id, setId] = useState([]);
    const [positions, setPositions] = useState([]);
    const [emails, setEmails] = useState([]);

    function removeEmployee(index) {
        setEmployees(employees.filter((_, i) => { return i != index }));
        setId(id.filter((_, i) => { return i != index }));
        setPositions(positions.filter((_, i) => { return i != index }));
        setEmails(emails.filter((_, i) => {return i != index }));
    };
    

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