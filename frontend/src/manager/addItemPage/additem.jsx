import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './additem.css'; // Optional: Add your styles here

function AddItemPage() {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemAvailability, setItemAvailability] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/add_menu_item/${encodeURIComponent(itemName)}/${encodeURIComponent(itemType)}/${encodeURIComponent(itemAvailability)}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Sucessfully added menu item') {
                    alert('Menu item added successfully!');
                } else {
                    alert('Failed to add the menu item.');
                }
            })
            .catch((error) => {
                console.error('Error adding menu item:', error);
                alert('An error occurred while adding the menu item.');
            });

        setItemName('');
        setItemType('');
        setItemAvailability('');
    };

    return (
        <>
            <div className="total-container">
                <h1>Add New Menu Item</h1>
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
                        <label htmlFor="itemType">Item Type (Entree, Side, Drinks, Appetizer, etc):</label>
                        <input
                            type="text"
                            id="itemType"
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemAvailability">Availability (true / false):</label>
                        <input
                            type="text"
                            id="itemAvailability"
                            value={itemAvailability}
                            onChange={(e) => setItemAvailability(e.target.value)}
                            required
                        />
                    </div>

                    <div className="buttons-group">
                        <button type="submit">Add Item</button>
                        <button type="button" className="back-button" onClick={() => navigate('/manager/menuItems')}>Back</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddItemPage;

