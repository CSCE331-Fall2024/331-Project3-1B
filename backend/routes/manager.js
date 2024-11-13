const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const router = express.Router();

// middle ware
router.use(cors());

// Configure the PostgreSQL pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

router.get('/', (req, res) => {
    res.send('manager home');
});

// get list of all employee data
router.get('/get_all_employees', (req, res) => {
    let employees = []
    pool
        .query('SELECT * FROM employees;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                employees.push(query_res.rows[i]);
            }
            res.json(employees);
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send("Error getting employees")
        });
});


const fetchOrdersToday = (limitOrders) => (req, res, next) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(currentDate.getDate()).padStart(2, '0');        // Add leading zero
    const formattedDate = `${year}-${month}-${day}`;
    let query = `SELECT * FROM sales_order_history 
                    WHERE date_time_ordered BETWEEN '${formattedDate} 00:00:00' AND '${formattedDate} 23:59:59'
                    ORDER BY date_time_ordered `
    if (limitOrders) {
        query += 'DESC LIMIT 5;';
    } else {
        query += 'ASC;'
    };
    pool
        .query(query)
        .then(query_res => {
            req.orders = query_res.rows;
            next();
        })
        .catch(err => {
            console.error('Error getting most recent 5 orders', err.stack)
            res.status(500).send('Error getting most recent 5 orders')
        });
};


// get 5 most recent items
router.get('/recent_sales_today', fetchOrdersToday(true), (req, res) => {
    res.json(req.orders);
});

// get all combos today (for pie chart)
router.get('/combos_today', fetchOrdersToday(false), (req, res) => {
    let comboQuantities = {
        'bowl' : 0,
        'plate' : 0,
        'bigger plate': 0,
        'a la carte' : 0,
        'family meal': 0,
        'panda cub meal' : 0,
        'party platter' : 0,
    };
    const ordersToday = req.orders;
    const orderNums = ordersToday.map(order => order.order_number);
    // array to hold all promises
    const promises = [];
    for (let i = 0; i < orderNums.length; ++i) {
        const query = `SELECT item_serial_number FROM sales_order_history_details WHERE order_number = ${orderNums[i]};`
        const promise = pool
            .query(query)
            .then(query_res => query_res.rows)
            .then(serialNums => {
                serialNums.forEach(serialNum => {
                    switch (serialNum.item_serial_number) {
                        case 1:
                            comboQuantities['bowl'] += 1;
                            break;
                        case 2:
                            comboQuantities['plate'] += 1;
                            break;
                        case 3:
                            comboQuantities['bigger plate'] += 1;
                            break;
                        case 4:
                        case 5:
                        case 6:
                            comboQuantities['a la carte'] += 1;
                            break;
                        case 7:
                            comboQuantities['family meal'] += 1;
                            break;
                        case 8:
                            comboQuantities['panda cub meal'] += 1;
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            comboQuantities['party platter'] += 1;
                            break;
                    }
                });
                
            });
        promises.push(promise);
    }

    // wait for all promises to complete
    Promise.all(promises)
        .then(() => res.json(comboQuantities));
});

// get menu items (sides and entrees)
router.get("/get_menu_items", (req, res) => {
    const query = 'SELECT * FROM menu_items';
    pool
        .query(query)
        .then(query_res => res.json(query_res.rows))
        .catch(err => {
            console.error("Error getting menu items");
            res.status(500).send("Error getting menu items");
        });
});

module.exports = router;