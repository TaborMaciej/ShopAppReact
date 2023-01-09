const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const admin = mysql.createPool({
    connectionLimit: 10,
    port: "3306",
    host: "localhost",
    user: "admin_sklep",
    password: "admin",
    database: "sklep_z_grami"
})

const employee = mysql.createPool({
    connectionLimit: 10,
    port: "3306",
    host: "localhost",
    user: "pracownik_sklep",
    password: "pracownik",
    database: "sklep_z_grami"
})

const client = mysql.createPool({
    connectionLimit: 10,
    port: "3306",
    host: "localhost",
    user: "klient_sklep",
    password: "klient",
    database: "sklep_z_grami"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//login request
const login = require('./routes/login.js');
login(app, admin);

//check if email already exists
const checkEmail = require('./routes/checkEmail.js');
checkEmail(app, admin);

//register user
const register = require('./routes/register.js')
register(app, admin);

//get list of games
const games = require('./routes/games.js');
games(app, client);

//check if products are available
const available = require('./routes/available.js');
available(app, client);

//order products
const order = require('./routes/order.js');
order(app, client);

//get list of user's orders
const userOrders = require('./routes/userOrders.js');
userOrders(app, client);

//get list of employee's orders
const employeeOrders = require('./routes/employeeOrders.js');
employeeOrders(app, employee)

//update status
const status = require('./routes/status.js');
status(app, employee)
app.listen(3001, () =>{
    console.log("Server running on port 3001");
});