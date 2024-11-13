var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'csce-315-db.engr.tamu.edu',
  user: 'team_1b',
  password: 'deerling',
  database: 'team_1b_db',
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// Submit types (ex: bowl, plate, bigger plate, etc) first
// Submit items associated with each type in order

// Sumbitting Order:
// 1) Create order in sales_order_history
// 2) Get Serial (ID) of new sales_order_history
// 3) Submit types -> Need to remember order
// 4) Submit items with each type -> In same order as type

// function GetTypeID(type){
//     conn.query(
//         `SELECT option_serial_number FROM menu_options WHERE option_name = ?`,
//         [type],
//         function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//         }
//     );
// }


// /**
//  * 
//  * @param {String[]} types List of entree type
//  * @param {String[][]} item_names List of list of item names corresponding to each type
//  */
// function SubmitOrder(types, item_names){

// }

// t = ["Bowl", "Plate", "Bigger Plate"]
// i = [["Mushroom Chicken", "Fried Rice"], ["Orange Chicken", "Mushroom Chicken", "Super Greens"], [""]]

// GetTypeID("Bowl");