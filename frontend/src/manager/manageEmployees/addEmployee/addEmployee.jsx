import './addEmployee.css';
import PageHeader from '../../header/pageHeader';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const navigate = useNavigate();
    const backToEmployeePage = () => {
        navigate('/manager/employees');
    };

    return (
        <>
            <PageHeader />
            <div id='add-employee-container'>
                <div id='add-employee-header-container'>
                    <h2>Add Employee</h2>
                    <button id='back-btn' onClick={ backToEmployeePage }>Back</button>
                </div>
                
            </div>
        </>
    );
};

export default AddEmployee