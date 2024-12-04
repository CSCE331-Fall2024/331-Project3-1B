import './addEmployee.css';
import PageHeader from '../../header/pageHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * creates a page that allows you to add an employee to the database
 * @returns {HTML} AddEmployee page
 */
function AddEmployee() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        wage: '',
        position: '',
    });

    const backToEmployeePage = () => {
        navigate('/manager/employees');
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetails(prev => ({
            ...prev, // copy exisiting properties
            [name]: value // update specific property
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeDetails = {
            // variable names have to match backend
            fullName: details.fullName,
            email: details.email,
            phoneNumber: details.phoneNumber,
            wage: details.wage,
            position: details.position,
        };
        try {
            // send api call to post new employee data
            const result = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/add_employee`, 
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(employeeDetails)
                }
            );

            if (result.ok) {
                const response = await result.json()
                console.log("added employee", response);
                // reset form
                setDetails({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    wage: '',
                    position: '',
                });
            } else {
                console.error("could not add employee");
            }
        } catch (error) {
            console.error("failed to add employee", error);
        }
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    return (
        <>
            <PageHeader />
            <div id='add-employee-container'>
                <form onSubmit={() => {handleSubmit();playSound('/Sounds/ButtonSound.mp3')}}>
                    <div id='add-employee-header-container'>
                        <div></div>
                        <h2>Add Employee</h2>
                        <button id='back-btn' type='button' onClick={() => {backToEmployeePage();playSound('/Sounds/ButtonSound.mp3')}}>Back</button>
                    </div>
                    <div id='add-employee-form-container'>
                        <div className='employee-form-field'>
                            <h3>Full Name</h3>
                            <input name='fullName' className='input-container' type='text' value={details.fullName} onChange={handleChange} required />
                        </div>

                        <div className='employee-form-field'>
                            <h3>Email</h3>
                            <input name='email' className='input-container' type='email' value={details.email} onChange={handleChange} required />
                        </div>

                        <div className='employee-form-field'>
                            <h3>Phone Number</h3>
                            <input name='phoneNumber' className='input-container' type='tele' value={details.phoneNumber} onChange={handleChange} required />
                        </div>

                        <div className='employee-form-field'>
                            <h3>Hourly Wage</h3>
                            <input name='wage' className='input-container' type='number' value={details.wage} onChange={handleChange} required />
                        </div>


                        <div className='employee-form-field'>
                            <h3>Position</h3>
                            <input name='position' className='input-container' type='text' value={details.position} onChange={handleChange} required />
                        </div>

                        <button id='submit-btn' type='submit' onClick={() => {playSound('/Sounds/ButtonSound.mp3')}}>Submit</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default AddEmployee
