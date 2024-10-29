import "./currEmployeeItem.css";

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