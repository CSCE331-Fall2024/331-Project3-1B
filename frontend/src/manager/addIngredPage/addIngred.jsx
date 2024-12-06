import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './addIngred.css'; // Optional: Add your styles here

function AddIngred() {
    const [itemName, setItemName] = useState('');
    const [itemOption, setItemOption] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [servings, setServings] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        

        const url = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/add_ingredients/${encodeURIComponent(itemName)}/${encodeURIComponent(itemOption)}/${encodeURIComponent(ingredients)}/${encodeURIComponent(servings)}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'added ingredients') {
                    alert('Ingredients added successfully!');
                } else {
                    alert('Failed to add the ingredients.');
                }
            })
            .catch((error) => {
                console.error('Error adding ingredients:', error);
                alert('An error occurred while adding the ingredients.');
            });

        setItemName('');
        setItemOption('');
        setIngredients('');
        setServings('');
    };

    return (
        <>
            <div className="total-container">
                <h1>Add Ingredients</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemName">Item Name:</label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemOption">Option:</label>
                        <input
                            type="text"
                            id="itemOption"
                            value={itemOption}
                            onChange={(e) => setItemOption(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients:</label>
                        <input
                            type="text"
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="servings">Servings:</label>
                        <input
                            type="text"
                            id="servings"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            required
                        />
                    </div>

                    <div className="buttons-group">
                        <button type="submit">Add Ingredients</button>
                        <button type="button" className="back-button" onClick={() => navigate('/manager/menuItems')}>Back</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddIngred;