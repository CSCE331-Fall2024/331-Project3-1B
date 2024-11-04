import "./employeeCard.css";

// creating individual employee cards
function EmployeeCard({ name, position, email}) {
    return (
        <>
            <div id="employee-card">
                <h2 className="employee-info">{name}</h2>
                <h2 className="employee-info">{position}</h2>
                <h2 className="employee-info">{email}</h2>
                <button id="remove-employee-button">Remove Employee</button>
            </div>
        </>
    );
};

export default EmployeeCard;