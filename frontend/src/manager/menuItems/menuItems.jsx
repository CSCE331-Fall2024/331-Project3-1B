import { useState, useEffect } from 'react';
import './menuItems.css';
import PageHeader from '../header/pageHeader.jsx';
import SingleMenuItem from './singleMenuItem.jsx';

function MenuItems() {
    const [itemId, setItemID] = useState([]);
    const [itemName, setItemName] = useState([]);
    const [itemType, setItemType] = useState([]);
    const [itemAvailability, setItemAvailability] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/manager/get_menu_items')
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
                console.error('Error getting menu items');
            })
    }, []);
    return(
        <>
            <PageHeader />
            <div id='menu-item-container'>
                {itemId.map((id, index) => <SingleMenuItem key={index} item_id={id} item_name={itemName[index]} item_type={itemType[index]} item_availability={itemAvailability[index]} />)}
            </div>
        </>
    );
};

export default MenuItems