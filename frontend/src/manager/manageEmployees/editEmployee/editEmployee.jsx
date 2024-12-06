import './editEmployee.css';
import PageHeader from '../../header/pageHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/** 
 * generates the component to edit employee attributes
 * @return {HTML} EditEmployee
 */
function EditEmployee() {
    const [employeeID, setEmployeeID] = useState('');
    const [newInfo, setNewInfo] = useState(''); // new info the user wants to change to
    const [selectedOption, setSelectedOption] = useState(''); // selected option
    const employeeOptions = ['name', 'email', 'phone number', 'wage', 'position']; //all option
    const navigate = useNavigate();

    const backButtonClick = () => {
        navigate('/manager/employees')
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInfoChange = (e) => {
        setNewInfo(e.target.value);
    };

    const handleIDChange = (e) => {
        setEmployeeID(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let query;
        let body;
        switch (selectedOption) {
            case 'name':
                query = `https://three31-project3-1b-backend.onrender.com/manager/update_name/${employeeID}`;
                body = { fullName: newInfo };
                break;
            case 'email':
                query = `https://three31-project3-1b-backend.onrender.com/manager/update_email/${employeeID}`;
                body = { email: newInfo };
                break;
            case 'phone number':
                query = `https://three31-project3-1b-backend.onrender.com/manager/update_phone_number/${employeeID}`;
                body = { phoneNumber: newInfo };
                break;
            case 'wage':
                query = `https://three31-project3-1b-backend.onrender.com/manager/update_wage/${employeeID}`;
                body = { wage: newInfo };
                break;
            case 'position':
                query = `https://three31-project3-1b-backend.onrender.com/manager/update_position/${employeeID}`;
                body = { position: newInfo };
                break;
            default:
                console.error('Invalid option selected');
                return;
        }
    
        try {
            const response = await fetch(query, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            if (response.ok) {
                console.log('Employee information updated')
                setEmployeeID('');
                setNewInfo('');
                setSelectedOption('');
            } else {
                console.error('Error updating employee information');
            }
        } catch (error) {
            console.error('Failed to update employee information', error);
        }
    };

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }
    
    return (<>
        <PageHeader />
        <div id='add-edit-employee-container'>
            <div id='employee-header-container'>
                <div></div>
                <h2>Edit Employee</h2>
                <button id='back-btn' type='button' onClick={() => {backButtonClick(); playSound('/Sounds/ButtonSound.mp3');}}>
                    <i className="fa-solid fa-chevron-left icons"/>{' '}Back
                </button>
            </div>
            <div id='add-edit-employee-form-container'>
                <div className='label-field'>
                    <label htmlFor='option-select'>Select Edit Field: </label>
                    <select id='option-select' value={selectedOption} onChange={ handleOptionChange }>
                        <option value=''>--Choose an employee attribute to edit--</option>
                        {employeeOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className='label-field'>
                    <label htmlFor='employee-id-field'>Employee ID:</label>
                    <input id='employee-id-field' type='number' name='id' onChange={ handleIDChange } value={ employeeID }/>
                </div>

                <div className='label-field'>
                    <label htmlFor='option-field'>Updated Info:</label>
                    <input id='option-field' type='text' name='new-info' onChange={ handleInfoChange } value={ newInfo }/>
                </div>


                <button id='submit-btn' onClick={(e) => {handleSubmit(e); playSound('/Sounds/ButtonSound.mp3');}}>
                    <i className="fa-solid fa-check icons"/>{' '}Submit
                </button>
            </div>
        </div>
    </>)
};

export default EditEmployee;
