const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();

// middle ware
app.use(cors());
app.use(express.json());

app.use(router);

const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'team_1b',
    database: 'team_1b_db',
    password: 'deerling',
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

// Get whether an item is enabled or disabled
/**
 * Gets whether an item is enabled or disabled
 * @async
 * @param {string} item_name 
 * @returns {bool} enabled or disabled
 */
async function GetEnabledOrDisabled(item_name){
    const client = await pool.connect();
    try{
      const res = await client.query(`SELECT availability FROM menu_items WHERE item_name = '${item_name}';`)
  
      if (res.rows.length > 0){
        return "t" === res.rows[0]['availability'];
      }
      else{
        throw new Error('Could not get availability');
      }
  
    } catch (err){
      console.log(`Couldn't get Enabled Or Disabled status... ${item_name}`)
    } finally {
      if (client) client.release();
    }
  }

// Function for generating timestamp in SQL database format
/**
 * Function for generating timestamp in SQL database format
 * @returns {string} timestamp
 */
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
/**
 * Function to look up price in the junction table with the option type ID & the menu item type ID
 * @async
 * @param {int} option_ID 
 * @param {int} item_ID 
 * @returns {float} price
 */
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
/**
 * Get the ID of a option (bowl for example)
 * @async
 * @param {string} type 
 * @returns {int} id
 */
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
/**
 * Get the ID of the item 
 * @param {string} item 
 * @returns {int} id
 */
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
/**
 * gets the order number give the time of submission
 * @param {string} timestamp 
 * @returns {int} order number
 */
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

router.get('/', (req, res) => {
    res.send('submit home');
});

router.get('/submit-order', async (req, res) => {
    res.send('Navigate to this url with post to submit an order');
});

// Input Example:
// types = ['bowl', 'plate'] -> options 
// items = [['mushroom chicken','chow mein'] ,['orange chicken', 'fried rice', 'super greens']] -> items asscoiated with each option
/**
 * submits the order given what is in the order
 * @example
 * types = ['bowl', 'plate'] -> options 
 * items = [['mushroom chicken','chow mein'] ,['orange chicken', 'fried rice', 'super greens']] -> items asscoiated with each option
 * @param {JSON} Order
 * 
 */
router.post('/submit-order', async (req, res) => {

    const { types, items } = req.body; 

    

    try {
        const type_ids = await Promise.all(types.map(type => getOptionSerialNumber(type)));

        const item_ids = await Promise.all(
            items.map(async (sub_array) => await Promise.all(
                sub_array.map(async (item) => await getItemSerialNumber(item))
            ))
        );
        
        const timestamp = getFormattedTimestamp();

        const joint = type_ids.map((e, i) => [e, item_ids[i]]);

        const prices = await Promise.all(joint.map(async ([type, items]) => 
            Promise.all(items.map(async (item) => await GetPrice(type, item)))
        ));

        let total_price = prices.map(subArray => 
            subArray.reduce((acc, price) => acc + parseFloat(price), 0).toFixed(2)
        );

        total_price = total_price.reduce((acc, price) => acc + parseFloat(price), 0).toFixed(2);

        const CreateSalesOrderHistory = `INSERT INTO sales_order_history (date_time_ordered, price) VALUES ('${timestamp}', ${total_price}) RETURNING order_number;`;

        const result = await pool.query(CreateSalesOrderHistory);
        const order_number = result.rows[0].order_number.toString();

        // Insert into sales_order_history_details
        for (let i = 0; i < type_ids.length; ++i) {
            const current_type = type_ids[i];
            const query = `INSERT INTO sales_order_history_details (order_number, item_serial_number) VALUES (${order_number}, ${current_type});`;
            await pool.query(query);
        }

        for (let i = 0; i < item_ids.length; ++i) {
            const current_set = item_ids[i];
            for (let j = 0; j < current_set.length; ++j) {
                const current_item = parseInt(current_set[j]);
                const query = `INSERT INTO sales_order_history_details (order_number, item_serial_number) VALUES (${order_number}, ${current_item + 12});`;
                await pool.query(query);
            }
        }

        res.json({ message: 'Order submitted successfully', order_number });
    } catch (err) {
        console.error('Error submitting order:', err.stack);
        res.json({message:'Order failed to submit successfully', _er : err.stack});
    }
});


module.exports = router;

// (async function() {
//     try {
//       await SubmitOrder(types, items);
//     } finally {
//       pool.end();
//       console.log("Database pool closed.");
//     }
//   })();
