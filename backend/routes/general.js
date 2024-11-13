const { Pool } = require('pg');

const pool = new Pool({
  user: 'team_1b',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'team_1b_db',
  password: 'deerling',
  port: 5432, // Default PostgreSQL port
});

// EXAMPLE from Google AI
async function queryDatabase() {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT * FROM employees');
      console.log(res.rows);
      client.release();
    } catch (err) {
      console.error('Error executing query', err);
    } finally {
      await pool.end();
    }
  }

async function GetPrice(item_name, item_type) {
  const client = await pool.connect(); // Only declare `client` once
  try {
   
    const res = await client.query(`SELECT price_${item_type} FROM menu_items WHERE item_name = '${item_name}';`); 

    if (res.rows.length > 0) {
      return res.rows[0][`price_${item_type}`];
    } else {
      throw new Error('Item not found');
    }

  } catch (err) {
    console.log(`Could not get price... ${item_name}, ${item_type}`);
  } finally {
    if (client) client.release();
  }
}

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
  
// GetPrice("Mushroom Chicken", "bowl")
//   .then(price => {
//     console.log("Price:", price);
//   })
//   .catch(err => {
//     console.error("Error:", err);
//   })
//   .finally(() =>{
//     pool.end();
//   });

GetEnabledOrDisabled("")
  .then(status =>{
    console.log(status);
  })
  .catch(err => {
    console.log("Err")
  })
  .finally(() =>{
    pool.end();
  });