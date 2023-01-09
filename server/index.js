const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const admin = mysql.createPool({
    connectionLimit: 10,
    port: "3306",
    host: "localhost",
    user: "root",
    password: "",
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
games(app, admin);

//check if products are available
const available = require('./routes/available.js');
available(app, admin);

//order products
const order = require('./routes/order.js');
order(app, admin);

//get list of user's orders
const userOrders = require('./routes/userOrders.js');
userOrders(app, admin);

//get list of employee's orders
const employeeOrders = require('./routes/employeeOrders.js');
employeeOrders(app, admin)

//update status
const status = require('./routes/status.js');
status(app, admin)

//get list of systems
const system = require('./routes/system.js');
system(app, admin)

//add product
const addProduct = require('./routes/addProduct.js');
addProduct(app, admin)

app.listen(3001, () =>{
    console.log("Server running on port 3001");
});