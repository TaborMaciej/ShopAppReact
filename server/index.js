const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const db = mysql.createPool({
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
login(app, db);

//register user
const register = require('./routes/register.js')
register(app, db);


//get list of games
const games = require('./routes/games.js');
games(app, db);

//check if products are available
const available = require('./routes/available.js');
available(app, db);

//order products
const order = require('./routes/order.js');
order(app, db);

app.listen(3001, () =>{
    console.log("Server running on port 3001");
});