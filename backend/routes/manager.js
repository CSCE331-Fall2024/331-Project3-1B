const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const router = express.Router();

// middle ware
router.use(cors());
router.use(express.json());

// Configure the PostgreSQL pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});
/** the default response for the / route
 *  returns the message "manager home"
 *  @return {JSON} "manager home"
 */
router.get('/', (req, res) => {
    res.send('manager home');
});

// get list of all employee data
/**
 * gets a list all employee data when calling /get_all_employees
 * @return {JSON} data of all employees
 */
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

/** 
 * gets a list of the 5 most recent orders submitted today (according to system time)
 * @return {JSON} the 5 most recent orders and their cost
 */
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
/**
 * routes the fetchOrdersToday function to /recent_sales_today
 */
router.get('/recent_sales_today', fetchOrdersToday(true), (req, res) => {
    res.json(req.orders);
});

// get all combos today (for pie chart)
/**
 * gets a list of the number of each combo ordered today (according to system time)
 * @return {JSON} key value pair for all the combos and the number of occurances
 */
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
/**
 * gets a list of all menu items
 * @return {JSON} all the menu items
 */
router.get('/get_menu_items', async (req, res) => {
    const query = 'SELECT * FROM menu_items;';
    try {
        const query_res = await pool.query(query);
        res.json(query_res.rows);
    } catch (error) {
        console.error("Error getting menu items");
        res.status(500).send("Error getting menu items");
    }
});

// Get names of menu items (sides and entrees)
/**
 * gets a list of the names of all the menu items
 * @return {JSON} the names of all the menu items;
 */
router.get('/get_menu_item_names', async (req, res) => {
    try {
        const query = 'SELECT item_name FROM menu_items;';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error("Error getting menu item names");
        res.status(500).send("Error getting menu item names");
    }
});

// Get Employee Name given ID number
/**
 * gets the employee name given the ID number 
 * @param {int} id 
 * @return {string} name
 */
router.get('/get_employee_name/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT fullName from employees WHERE employeeid = '${id}';`;
        const result = await pool.query(query);
        res.json(result);
    } catch (error) {
        console.error("Error getting employee name");
        res.status(500).send("Error getting employee name");
    }
});
/**
 * gets the ID of the employee given the name of the employee
 * @param {string} name 
 * @return {int} id
 */
router.get('/get_employee_id/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const query = `SELECT employeeid from employees WHERE full_name = '${name}';`;
        const result = await pool.query(query);
        res.json(result);
    } catch (error) {
        console.error("Error getting employee id");
        res.status(500).send("Error getting employee id");
    }
});

// ADD(post) employee
/**
 * adds a new employee to the database
 * @param {JSON} the attributes of the employee
 */
router.post('/add_employee', async (req, res) => {
    const { fullName, email, phoneNumber, wage, position } = req.body;
    try {
        const query = `INSERT INTO employees (full_name, email, phone_number, hourly_wage, position) VALUES ('${fullName}', '${email}', '${phoneNumber}', ${wage}, '${position}') RETURNING *;`;
        const result = await pool.query(query);
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error("Could not add employee", error);
        res.status(500).send("Error adding employee");
    }
});

// remove employee
/**
 * deletes an employee given the id of the employee
 * @param {int} id
 */
router.delete('/remove_employee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM employees WHERE employeeid = '${id}' RETURNING *;`
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return res.status(404).send("Employee not found");
        }
        res.status(200).json(result.rows[0]);
    } catch(error) {
        res.status(500).send("Error deleting employee");
    }
});

// update employee name
/**
 * updates the employee's name given the id of the employee and the new name
 * @param {int} id
 * @param {string} name
 */
router.put('/update_name/:id', async (req, res) => {
    const { id } = req.params;
    const { fullName } = req.body;
    try {
        const query = `UPDATE employees SET full_name = '${fullName}' WHERE employeeid = ${id};`
        const result = await pool.query(query);
        if (result.rowCount == 0) {
            res.status(404).send("Employee not found");
            return
        }
        res.status(200).json(result.rows[0]);
    } catch {
        console.error("could not change employee name", error);
        res.status(500).send("error updating employee name");
    }
});

// update employee email
/**
 * updates the employee's email given the id of the employee and the new email
 * @param {int} id
 * @param {string} name
 */
router.put('/update_email/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const query = `UPDATE employees SET email = '${email}' WHERE employeeid = ${id};`
        const result = await pool.query(query);
        if (result.rowCount == 0) {
            res.status(404).send("Employee not found");
            return
        }
        res.status(200).json(result.rows[0]);
    } catch {
        console.error("could not change employee email");
        res.status(500).send("error updating employee email");
    }
});


// update employee phone number
/**
 * updates the employee's phone number given the id of the employee and the new phone number
 * @param {int} id
 * @param {string} phoneNumber
 */
router.put('/update_phone_number/:id', async (req, res) => {
    const { id } = req.params;
    const { phoneNumber } = req.body;
    try {
        const query = `UPDATE employees SET phone_number = '${phoneNumber}' WHERE employeeid = ${id};`
        const result = await pool.query(query);
        if (result.rowCount == 0) {
            res.status(404).send("Employee not found");
            return
        }
        res.status(200).json(result.rows[0]);
    } catch {
        console.error("could not change employee phone number");
        res.status(500).send("error updating employee phone number");
    }
});


// update employee wage
/**
 * updates the employee's wage given the id of the employee and the new wage
 * @param {int} id
 * @param {string} wage
 */
router.put('/update_wage/:id', async (req, res) => {
    const { id } = req.params;
    const { wage } = req.body;
    try {
        const query = `UPDATE employees SET hourly_wage = '${wage}' WHERE employeeid = ${id};`
        const result = await pool.query(query);
        if (result.rowCount == 0) {
            res.status(404).send("Employee not found");
            return
        }
        res.status(200).json(result.rows[0]);
    } catch {
        console.error("could not change employee wage");
        res.status(500).send("error updating employee wage");
    }
});


// update employee position
/**
 * updates the employee's position given the id of the employee and the new position
 * @param {int} id
 * @param {string} position
 */
router.put('/update_position/:id', async (req, res) => {
    const { id } = req.params;
    const { position } = req.body;
    try {
        const query = `UPDATE employees SET position = '${position}' WHERE employeeid = ${id};`
        const result = await pool.query(query);
        if (result.rowCount == 0) {
            res.status(404).send("Employee not found");
            return
        }
        res.status(200).json(result.rows[0]);
    } catch {
        console.error("could not change employee position");
        res.status(500).send("error updating employee position");
    }
});

/**
 * gets all the ingredients used given the type of combo and the item ordered
 * @param {string} option - the type of combo
 * @param {string} item - the name of the item
 */
router.get('/get_ingredients', async (req, res) => {
    const {option, item} = req.query;

    try {
        const query = `SELECT Ingredient_Serial_Number,Servings FROM Menu_ingredients WHERE Option_serial_number = ${option} AND item_serial_number = ${item};`;
        const check_drink = `SELECT item_type FROM menu_items WHERE item_serial_number = '17';`;

        const result = await pool.query(query);
        const type = await pool.query(check_drink);

        ingred_serial = result.rows[0].ingredient_serial_number.toString();
        ingred_servings = result.rows[0].servings.toString();

        _type = type.rows[0].item_type.toString();

        drink = false;

        if (_type === "KidDrinks" || _type === "Gatorade" || _type === "SoftDrinks"){
            drink = true;
        }

        const util_query = `SELECT Servings FROM Menu_ingredients WHERE Option_serial_number = ${option} AND item_serial_number = ${28};`;
        
        servs = "";
        if (drink){
            rs = pool.query(util_query);

            servs = rs.rows[0].servings.toString();

        }

        res.send({ingredient_serial_number : ingred_serial, ingredient_servings : ingred_servings, utinsels : servs});

    } catch (error) {
        res.send({message : "Could not query info... *Debug information later*"});        
    }
});



module.exports = router;
module.exports = router;
