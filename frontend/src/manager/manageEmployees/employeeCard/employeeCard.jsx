import "./employeeCard.css";

// creating individual employee cards
function EmployeeCard({ name, position, email}) {
    return (
        <>
            <div id="employee-card">
                <h2>{name}</h2>
                <h2>{position}</h2>
                <h2>{email}</h2>
                <button id="remove-employee-button">Remove Employee</button>
            </div>
        </>
    );
};

export default EmployeeCard;