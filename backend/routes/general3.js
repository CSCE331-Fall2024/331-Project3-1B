const { Pool } = require('pg');

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_1b',
    database: 'team_1b_db',
    password: 'deerling', // replace 'your_password' with the actual password
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
        // Run queries or perform database operations here

        // Release the client back to the pool when done
        release();
    }
});

// Function for generating timestamp in SQL database format
function getFormattedTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to look up price in the junction table with the option type ID & the menu item type ID
async function GetPrice(option_ID, item_ID) {
    const query = `SELECT price FROM menu_prices WHERE item_serial_number = ${item_ID} AND option_serial_number = ${option_ID};`;
    
    try{

        const result = await pool.query(query);

        // If nothing is in junction table then it is free
        if (result.rows.length === 0){
            return "0";
        }

        return result.rows[0].price.toString();
    } catch (error) {
        console.error('Error executing query... option=' + option_ID + " item=" + item_ID);
    }
}

// Get the ID of a option (bowl for example)
async function getOptionSerialNumber(type) {
    type = type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    const query = `SELECT option_serial_number FROM menu_options WHERE option_name = '${type}';`;

    try {
        const result = await pool.query(query);
        return result.rows[0].option_serial_number.toString(); // returns an array of rows that match the query
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
}

// Get the ID of the item 
async function getItemSerialNumber(item){
    item = item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    const query = `SELECT item_serial_number FROM menu_items WHERE item_name = '${item}';`;
    try {
        const result = await pool.query(query);
        return result.rows[0].item_serial_number.toString(); // returns an array of rows that match the query
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
}

async function getOrderNumber(timestamp){
    const query = `SELECT order_number FROM sales_order_history WHERE date_time_ordered = '${timestamp}';`;
    console.log(query);
    try {
        const result = await pool.query(query);
        return result.rows[0].order_number.toString();
    } catch (error) {
        console.error(`Could not query database for order number... timestamp = ${timestamp}`);
    }
}




// Input Example:
// types = ['bowl', 'plate'] -> options 
// items = [['mushroom chicken','chow mein'] ,['orange chicken', 'fried rice', 'super greens']] -> items asscoiated with each option
async function SubmitOrder(types, items){
    const type_ids = await Promise.all(types.map(type => getOptionSerialNumber(type)));

    const item_ids = await Promise.all(
        items.map(async (sub_array) => await Promise.all(
            sub_array.map(async (item) => await getItemSerialNumber(item))
        ))
    );

    timestamp = getFormattedTimestamp();

    joint = type_ids.map(function(e, i) {
        return [e, item_ids[i]];
    });

    const prices = await Promise.all(joint.map(async ([type, items]) => 
        Promise.all(items.map(async (item) => await GetPrice(type, item)))
    ));

    total_price = prices.map(subArray => 
        subArray.reduce((acc, price) => acc + parseFloat(price), 0).toFixed(2)
    );

    total_price = total_price.reduce((acc, price) => acc + parseFloat(price), 0).toFixed(2);

    const CreateSalesOrderHistory = `INSERT INTO sales_order_history (date_time_ordered, price) VALUES ('${timestamp}', ${total_price}) RETURNING order_number;`;
    
    order_number = 0;

    try {
        const result = await pool.query(CreateSalesOrderHistory);
        order_number = result.rows[0].order_number.toString();
    } catch (error) {
        console.error(`Failed to insert order into database... ${timestamp}, ${total_price}`);
    }

    // sales_order_history_details:
    // order_number | item_serial_number

    for (let i = 0; i < type_ids.length; ++i){
        current_type = type_ids[i];

        const query = `INSERT INTO sales_order_history_details (order_number, item_serial_number) VALUES (${99999}, ${current_type});`;

        try {
            await pool.query(query);
        } catch (error) {
            console.error('Failed to add to sales_order_history... option = ' + current_type);
        }
    }

    for (let i = 0; i < item_ids.length; ++i){
        current_set = item_ids[i];

        for (let j = 0; j < current_set.length; ++j){

            current_item = parseInt(current_set[j]);
            
            const query = `INSERT INTO sales_order_history_details (order_number, item_serial_number) VALUES (${99999}, ${current_item + 12});`;

            try {
                await pool.query(query);
            } catch (error) {
                console.error('Failed to add to sales_order_history... item = ' + current_item);
            }
        }
    }
}

types = ["Bowl", "Plate"];
items = [["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken"], ["Hot Ones Blazing Bourbon Chicken", "The Original Orange Chicken", "Black Pepper Sirloin Steak"]];

(async function() {
    try {
      await SubmitOrder(types, items);
    } finally {
      pool.end();
      console.log("Database pool closed.");
    }
  })();



  // Example usage
// getOptionSerialNumber("bigger plate")
//      .then(data => console.log('Query Result:', data))
//      .catch(error => console.error('Query Error:', error))
    

// getOptionSerialNumber("bowl")
//     .then(data => console.log('Query Result:', data))
//     .catch(error => console.error('Query Error:', error))

// getItemSerialNumber("mushroom chicken")
//     .then(data => console.log('Query Result:', data))
//     .catch(error => console.error('Query Error:', error))