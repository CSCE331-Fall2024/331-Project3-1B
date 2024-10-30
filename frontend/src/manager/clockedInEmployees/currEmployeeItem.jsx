import "./currEmployeeItem.css";

// creates a card for each employee that is currently clocked in
function CurrEmployeeItem({ employeeName }) {
    return (
        <>
            <div id="employee-card-container">
                <h1 id="employee-name">{employeeName}</h1>
            </div>
        </>
    );

}

export default CurrEmployeeItem;