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

// Get minimum price given menu option
/**
 * gets the price of the cheapest item of a given menu option
 * @return {JSON} the cheapest price;
 */
router.get('/get_cheapest_option_prices/', async (req, res) => {
    try {
        const query = `SELECT * FROM menu_prices;`;
        const result = await pool.query(query);
        const data = result.rows;
        min_list = Array(14).fill(Number.MAX_SAFE_INTEGER);
        for (let i = 0; i < data.length; ++i){
            if (data[i].item_serial_number < 5) {
                if (data[i].option_serial_number == 4) {
                    if (parseFloat(data[i].price) < min_list[12]) {
                        min_list[12] = parseFloat(data[i].price);
                    }
                } if (data[i].option_serial_number == 6) {
                    if (parseFloat(data[i].price) < min_list[13]) {
                        min_list[13] = parseFloat(data[i].price);
                    }
                }
            } else if (data[i].item_serial_number < 19) {
                if (parseFloat(data[i].price) < min_list[parseInt(data[i].option_serial_number) - 1]) {
                    min_list[parseInt(data[i].option_serial_number) - 1] = parseFloat(data[i].price);
                }
            }
        }
        res.json(min_list);
    } catch (error) {
        console.error("Error getting price");
        res.status(500).send("Error getting price");
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
/**
 * creates a zReport given the start and end times
 * @param {Timestamp} starttime
 * @param {Timestamp} endtime
 * @return {JSON} zReport
 */
router.get('/zReport', async (req, res) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    let zReportResults = {};
    let total_sales_price = 0;

    // opening hours 10am-9pm
    for (let hour = 10; hour <= 20; ++hour) {
        const starttime = new Date(`${formattedDate}T${String(hour).padStart(2, '0')}:00:00`);
        const endtime = new Date(`${formattedDate}T${String(hour).padStart(2, '0')}:59:59`);

        const zReportQuery = "SELECT SUM(price) AS total_sales FROM sales_order_history WHERE Date_time_ordered BETWEEN $1 AND $2;";

        // get total sales
        try {
            const result = await pool.query(zReportQuery, [starttime, endtime]);
            if (result.rows.length > 0) {
                total_sales_price += parseFloat(result.rows[0].total_sales);
            }
        } catch (error) {
            console.error('Error in zReport query', error);
            res.status(500).send("Error generating query in zReport");
            return
        }

        endtime.setSeconds(60);
        const end_time = endtime.toLocaleTimeString([], {hour: "numeric"});

        zReportResults[[end_time]] = total_sales_price;
    };

    res.json(zReportResults);
});
/**
 * creates a xReport for the current day
 * @return {JSON} xReport
 */
router.get('/xReport', async (req, res) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    let xReportResults = [];

    // opening hours 10am-9pm
    for (let hour = 10; hour <= 20; ++hour) {
        const starttime = new Date(`${formattedDate}T${String(hour).padStart(2, '0')}:00:00`);
        const endtime = new Date(`${formattedDate}T${String(hour).padStart(2, '0')}:59:59`);

        const xReportQuery1 = "SELECT SUM(price) AS total_sales FROM sales_order_history WHERE Date_time_ordered BETWEEN $1 AND $2;";
        const xReportQuery2 = "SELECT COUNT(price) AS total_orders FROM sales_order_history WHERE Date_time_ordered BETWEEN $1 AND $2;";
        const xReportQuery3 = "SELECT item_serial_number FROM sales_order_history INNER JOIN sales_order_history_details ON sales_order_history.order_number = sales_order_history_details.order_number WHERE date_time_ordered BETWEEN $1 AND $2;";

        let total_sales_count = 0;
        let total_sales_price = 0;
        let item_count = 0;

        // get total sales
        try {
            const result1 = await pool.query(xReportQuery1, [starttime, endtime]);
            if (result1.rows.length > 0) {
                total_sales_price = result1.rows[0].total_sales;
            }
        } catch (error) {
            console.error('Error in xReport query 1', error);
            res.status(500).send("Error generating query 1 in xReport");
            return
        }

        // get total orders
        try {
            const result2 = await pool.query(xReportQuery2, [starttime, endtime]);
            if (result2.rows.length > 0) {
                total_sales_count = result2.rows[0].total_orders;
            }
        } catch (error) {
            console.error("Error in xReport query 2", error);
            res.status(500).send("Error generating query 2 in xReport");
            return
        }

        try {
            const result3 = await pool.query(xReportQuery3, [starttime, endtime]);
            if (result3.rows.length > 0) {
                let total_items = result3.rows;
                total_items.map(item => {
                    if (item.item_serial_number > 12) {
                        ++item_count;
                    }
                });
            } else {
                console.error('Could not find items sold in this one hour frame');
                res.status(500).send('Error getting items in time frame');
            }
        } catch (error) {
            console.error('Error in generating xReport query 3');
            res.status(500).send('Error generating query 3 in xReport');
            return;
        }

        const start_time = starttime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const end_time = endtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        xReportResults.push({
            start_time,
            end_time,
            total_orders: total_sales_count,
            total_cost: total_sales_price,
            total_items: item_count
        });
    };

    res.send(xReportResults);
});


/**
 * adds menu item
 * @param {string} name - name of new item
 * @param {string} type - type of new item
 * @param {string} availability - true or false of availability new item
 */
router.get('/add_menu_item/:name/:type/:availability', async (req, res) => {
    const {name, type, availability} = req.params;

    try {
        const query = `INSERT INTO menu_items (item_name, item_type, availability) VALUES ('${name}', '${type}', ${availability});`
        result = pool.query(query);

        res.send({message : 'Sucessfully added menu item'});
    } catch (error) {
        res.send({message : 'Failed to add menu item'});
    }
});

async function getItemID(name) {
    try {
        const query = `SELECT item_serial_number FROM menu_items WHERE item_name = '${name}';`
        result = await pool.query(query);
        return result.rows[0].item_serial_number;
    } catch (error) {
        console.log("Could not query item ID line 546");
    }
}

async function getTypeID(name) {
    try {
        const query = `SELECT option_serial_number FROM menu_options WHERE option_name = '${name}';`
        result = await pool.query(query);
        return result.rows[0].option_serial_number;
    } catch (error) {
        console.log("Could not query item ID line 556");
    }
}

async function getIngredID(name) {
    try {
        const query = `SELECT id FROM inventory WHERE name = '${name}';`
        result = await pool.query(query);
        return result.rows[0].id;
    } catch (error) {
        console.log("Could not query ingredient ID line 566");
    }
}

router.get('/add_ingredients/:name/:type/:ingredients/:servings', async (req, res) => {

    try {
        const {name, type, ingredients, servings} = req.params;
        
        nameID = await getItemID(name);
        optionID = await getTypeID(type);
        ingredList = JSON.parse(ingredients);   
        servingList = JSON.parse(servings);
        
        for (let i = 0; i < ingredList.length; ++i) {
            let ingred = await getIngredID(ingredList[i]);
            let servings = servingList[i];

            const query = `INSERT INTO menu_ingredients (item_serial_number, option_serial_number, ingredient_serial_number, servings) VALUES (${nameID}, ${optionID}, ${ingred}, ${servings});`
            await pool.query(query);
        }

        res.send({message : "added ingredients"});

    } catch (error) {
        res.send({message : "failed to add ingredients..."});
    }

});

/**
 * adds menu item
 * @param {string} name - name of new item
 * @param {string} column - column to update
 * @param {string} new_val - new value of column to update
 */
router.get('/edit_menu_item/:name/:column/:new_val'), async (req, res) => {
    const {name, column, new_val} = req.params;

    try {
        
    } catch (error) {
        
    }
}

/**
 * gets the number of items given combo type
 * @param {int} item_type_number 
 * @returns number of items in combo
 */
const getEntreeAndSide = async (item_type_number) => {
    try {
        const query = `SELECT sides,entree FROM combo_details WHERE combo_serial_number = '${item_type_number}' ;`;
        const result = await pool.query(query);
       // console.log(result);
        let numSides = parseInt(result.rows[0].sides.toString());
        let numEntrees = parseInt(result.rows[0].entree.toString());
        return numSides + numEntrees; 
    } catch (error) {
        console.error(error);
    }

};
/**
 *  reconstructs order from database and given order number
 * @param {int} order_number 
 * @returns list of pair of combo type and item number
 */
const ReconstructOrder = async (order_number) =>{
    let combos = [];
    let buffer = [];
    try {
        const query = `SELECT item_serial_number FROM sales_order_history_details WHERE Order_Number = '${order_number}' ORDER BY insertion_order;`;
        const result = await pool.query(query);
        for(const row of result.rows){
            buffer.push(parseInt(row.item_serial_number.toString()));
        }
    } catch (error) {
        console.error("Error");
    }
    let combobuffer = [];
    let itembuffer = [];
    let index = 0;
    for(const i of buffer)
    {
        if(i <= 12){
            combobuffer.push(i);
        }
        else
        {
            itembuffer.push(i - 12);
        }
    }
    for(const combo_type of combobuffer)
    {
       let numberofitems = await getEntreeAndSide(combo_type);
       for(let i = 0; i < numberofitems; i++){
        combos.push([combo_type,itembuffer[index]]);
        index++;
       }
       combos.push([combo_type,28]);

    }
    return combos;

};
/**
 * gets the inventory usage given a time range
 * @param {Timestamp} starttime 
 * @param {Timestamp} endtime 
 * @return pair of ingredient and usage amount
 */
const GetInventoryUsage = async (starttime, endtime) => {
    let inventory_usage = [];
    let orders = [];
    let tempcount = 0;
    try {
        const query = "SELECT COUNT(*) AS total_inventory FROM Inventory";
        const result = await pool.query(query);
        tempcount = result.rows[0].total_inventory
    } catch (error) {
        console.error(error);
    }
    for(let i = 0; i < tempcount; i++){
        inventory_usage.push([i,0.0]);
    }

    try {
        const query = "SELECT Order_number FROM sales_order_history WHERE Date_time_ordered BETWEEN $1 AND $2;";
        const result = await pool.query(query, [starttime,endtime]);
        for(const row of result.rows){
            orders.push(parseInt(row.order_number.toString()));
        }
    } catch (error) {
        console.error(error);
    }
    for(let i of orders)
    {
        let combos = await ReconstructOrder(i);
        for(let entry of combos)
        {
            let option_serial_number = entry[0];
            let item_serial_number = entry[1];
            let resultlist = [];
            try {
                const query = "SELECT Ingredient_Serial_Number,Servings FROM Menu_Ingredients WHERE Option_Serial_Number = $1 AND Item_Serial_Number = $2;";
                const result = await pool.query(query, [option_serial_number, item_serial_number]);
                for(const row of result.rows){
                    resultlist.push([row.ingredient_serial_number,parseFloat(row.servings)]);
                }
            } catch (error) {
                console.error(error);
            }
            for(let item of resultlist)
            {
              inventory_usage[item[0]][1] += item[1] ;
            }
        }
    }

    for (let id = 0; id < inventory_usage.length; ++id) {
        try {
            const query = `SELECT name FROM inventory WHERE id = ${id + 1};`;
            const result = await pool.query(query);
            inventory_usage[id][0] = result.rows[0].name;
        } catch (error) {
            console.error('Error getting name for inventory item');
        }
    }

    return inventory_usage;
};

router.get('/getInventoryUsage', async (req, res) => {
    const { startTime, endTime } = req.query; // use query for get requests
    try {
        const result = await GetInventoryUsage(startTime, endTime);
        res.json(result);
    } catch (error) {
        console.error('Error getting inventory usage');
        res.status(500).send('Could not get inventory usage for report');
    }
});

/**
 * gets the sales report list of items
 * @param {Timestamp} starttime 
 * @param {Timestamp} endtime 
 * @returns list of items and number of times ordered
 */
const getSalesReport = async (starttime, endtime) => {
    let tempcount = 0;
    try {
        const query = "SELECT max(item_serial_number) AS maxnumber FROM sales_order_history_details";
        const result = await pool.query(query);
        tempcount = result.rows[0].maxnumber
    } catch (error) {
        console.error(error);
    }
    let SalesReport = [];
    for(let i = 0; i < tempcount - 12; i++){
        SalesReport.push([i + 1,0]);
    }
    try {
        const query = "SELECT sales_order_history_details.item_serial_number FROM sales_order_history INNER JOIN sales_order_history_details ON sales_order_history.order_number = sales_order_history_details.order_number INNER JOIN menu_items ON sales_order_history_details.item_serial_number = menu_items.item_serial_number WHERE date_time_ordered BETWEEN $1 AND $2;";
        const result = await pool.query(query, [starttime, endtime]);
        for(const row of result.rows){
          if(row.item_serial_number > 12){
          SalesReport[row.item_serial_number - 13][1]++;
          }
        }
    } catch (error) {
        console.error(error);
    }

    for (let id = 1; id <= 25; ++ id) {
        try {
            const query = `SELECT item_name FROM menu_items WHERE item_serial_number = ${id};`;
            const result = await pool.query(query);
            SalesReport[id - 1][0] = result.rows[0].item_name;
        } catch (error) {
            console.error('error in getting menu item name');
            return;
        }
    }

    salesReportObject = {
        item_name: null,
        item_quantity: null,
    };

    salesReportObject.item_name = SalesReport.map(item => item[0]);
    salesReportObject.item_quantity = SalesReport.map(item => item[1]);

    return salesReportObject;
}

router.get('/get_sales_report', async (req, res) => {
    const {startTime, endTime} = req.query;
    try {
        const result = await getSalesReport(startTime, endTime);
        res.json(result);
    } catch (error) {
        console.error('Backend: could not get sales report data');
        res.status(500).send('Error getting sales report data in backend');
    }
});


module.exports = router;
