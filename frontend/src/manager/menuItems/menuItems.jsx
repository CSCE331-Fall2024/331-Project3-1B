import { useState, useEffect } from 'react';
import './menuItems.css';
import PageHeader from '../header/pageHeader.jsx';
import SingleMenuItem from './singleMenuItem.jsx';
import { useNavigate } from 'react-router-dom';

// screen in manager view that lists out all menu items
/**
 * screen in manager view that lists out all menu items
 * @return {HTML} the menu for manager
 */

function MenuItems() {

    const navigate = useNavigate();

    const [itemId, setItemID] = useState([]);
    const [itemName, setItemName] = useState([]);
    const [itemType, setItemType] = useState([]);
    const [itemAvailability, setItemAvailability] = useState([]);

    // api call to get all menu items
    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/manager/get_menu_items`)
            .then(response => response.json())
            .then(items => {
                const itemIds = items.map(item => item.item_serial_number);
                const itemNames = items.map(item => item.item_name);
                const itemTypes = items.map(item => item.item_type);
                const itemAvailabilities = items.map(item => item.availability);
                setItemID(itemIds);
                setItemName(itemNames);
                setItemType(itemTypes);
                setItemAvailability(itemAvailabilities);
            })
            .catch(error => {
                console.error(error);
                console.error('Error getting menu items');
            })
    }, []);

    const AddMenuItemPage = () => {
        navigate('/manager/menuItems/additem');
    };

    const AddIngredPage = () => {
        navigate('/manager/menuItems/addingred');
    };
    
    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    return(
        <> 
            <PageHeader />
            <div id="total-container">
                <div id='total-content'>
                    <div id='all-buttons' >
                        <button className='menu-item-button' onClick={() => {AddMenuItemPage();playSound('/Sounds/ButtonSound.mp3')}}>Add Menu Item</button>
                        <button className='menu-item-button' onClick={() => {AddIngredPage();playSound('/Sounds/ButtonSound.mp3')}}>Add Ingredients</button>
                    </div>

                    <div id='menu-item-container'>
                        {/* creates item component for each menu item */}
                        {itemId.map((id, index) => <SingleMenuItem key={index} item_id={id} item_name={itemName[index]} item_type={itemType[index]} item_availability={itemAvailability[index]} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuItems;

