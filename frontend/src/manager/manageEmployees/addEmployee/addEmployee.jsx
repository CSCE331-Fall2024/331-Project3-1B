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
                    <div></div>
                    <h2>Add Employee</h2>
                    <button id='back-btn' onClick={ backToEmployeePage }>Back</button>
                </div>
                <div id='add-employee-form-container'>
                    <div className='employee-form-field'>
                        <h3>Full Name</h3>
                        <input className='input-container'></input>
                    </div>

                    <div className='employee-form-field'>
                        <h3>Email</h3>
                        <input className='input-container'></input>
                    </div>

                    <div className='employee-form-field'>
                        <h3>Phone Number</h3>
                        <input className='input-container'></input>
                    </div>

                    <div className='employee-form-field'>
                        <h3>Hourly Wage</h3>
                        <input className='input-container'></input>
                    </div>


                    <div className='employee-form-field'>
                        <h3>Position</h3>
                        <input className='input-container'></input>
                    </div>

                    <button id='submit-btn'>Submit</button>
                </div>
            </div>
        </>
    );
};

export default AddEmployee