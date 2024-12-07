import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './updatePrice.css';

/**
 * generates a component that allows you to change the price of a menu item
 * @returns {HTML} update price component
 */
function UpdatePricePage() {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemAvailability, setItemAvailability] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(itemName);
        console.log(itemType);
        console.log(itemAvailability);

        const url = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/edit_price/${encodeURIComponent(itemName)}/${encodeURIComponent(itemType)}/${encodeURIComponent(itemAvailability)}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Price updated') {
                    alert('Price updated sucessfully!');
                } else {
                    alert('Failed to update the price.');
                }
            })
            .catch((error) => {
                console.error('Error updating price:', error);
                alert('An error occurred while updating price.');
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
                <h1>Update Price</h1>
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
                        <label htmlFor="itemType">Item Type (Bowl, Plate):</label>
                        <input
                            type="text"
                            id="itemType"
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemAvailability">Price:</label>
                        <input
                            type="text"
                            id="itemAvailability"
                            value={itemAvailability}
                            onChange={(e) => setItemAvailability(e.target.value)}
                            required
                        />
                    </div>

                    <div className="buttons-group">
                        <button className="menu-item-button" type="submit">Update Price</button>
                        <button type="button" className="menu-item-button" onClick={() => {playSound('/Sounds/ButtonSound.mp3');navigate('/manager/menuItems')}}>Back</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdatePricePage;