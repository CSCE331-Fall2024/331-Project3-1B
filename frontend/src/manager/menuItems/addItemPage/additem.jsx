import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './additem.css';

function AddItemPage() {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemAvailability, setItemAvailability] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `https://three31-project3-1b-backend.onrender.com/manager/add_menu_item/${encodeURIComponent(itemName)}/${encodeURIComponent(itemType)}/${encodeURIComponent(itemAvailability)}`;
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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

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
                        <label htmlFor="itemType">Item Type (Entrees, Side):</label>
                        <input
                            type="text"
                            id="itemType"
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemAvailability">Availability (true/false):</label>
                        <input
                            type="text"
                            id="itemAvailability"
                            value={itemAvailability}
                            onChange={(e) => setItemAvailability(e.target.value)}
                            required
                        />
                    </div>

                    <div className="buttons-group">
                        <button className="menu-item-button" type="submit" >Add Item</button>
                        <button type="button" className="menu-item-button" onClick={() => {playSound('/Sounds/ButtonSound.mp3');navigate('/manager/menuItems')}}>Back</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddItemPage;

