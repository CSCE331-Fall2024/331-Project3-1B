import "./employeeCard.css";


// Play Sound Effect on button click
function playSound(file) {
    var audio = new Audio(file);
    audio.play();
}

// creating individual employee cards
/**
 * creating individual employee cards with given attributes
 * @param {string} name
 * @param {int} id
 * @param {string} position
 * @param {string} email 
 * @param {function} removeEmployee
 * @param {function} editEmployee
 * @returns {HTML} EmployeeCard
 */
function EmployeeCard({ name, id, position, email, removeEmployee, editEmployee }) {
    return (
        <>
            <div id="employee-card">
                <h2 className="employee-info">{name}</h2>
                <h2 className="employee-info">{id}</h2>
                <h2 className="employee-info">{position}</h2>
                <h2 className="employee-info">{email}</h2>
                <div className="function-btn-container">
                    <button className="employee-btn" onClick={() => {removeEmployee();playSound('/Sounds/ButtonSound.mp3')}}>
                    <i className="fa-solid fa-user-slash icons"/>{' '}Remove Employee</button>
                </div>
            </div>
        </>
    );
};

export default EmployeeCard;
