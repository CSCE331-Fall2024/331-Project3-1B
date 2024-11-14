import './singleMenuItem.css';

// component displaying info for a individual menu item
function SingleMenuItem({item_id, item_name, item_type, item_availability}) {
    return (
        <div id='item-container'>
            <h3>{item_id}</h3>
            <h3>{item_name}</h3>
            <h3>{item_type}</h3>
            <h3>{item_availability}</h3>
        </div>
    );
};

export default SingleMenuItem;