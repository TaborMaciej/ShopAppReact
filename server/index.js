const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const db = mysql.createPool({
    connectionLimit: 10,
    port: "3306",
    host: "localhost",
    user: "admin_gry",
    password: "password",
    database: "official_gry"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/login", (req, res) => {

    const email_ = req.body.email;
    const password_ = req.body.password;

    const sqlSelect = "SELECT osoba.Email, haslo.Nazwa FROM osoba INNER JOIN haslo ON osoba.ID_haslo = haslo.ID " +
    "WHERE osoba.Email = ? AND haslo.Nazwa = ?";
    db.query(sqlSelect, [email_, password_],(err, result)=>{
        if (err) throw err;
        if (result.length > 0)
        {
            console.log("Succesfully logged the user: " + email_)
            res.send(true);
        }
        else
            console.log("User has not been logged in: " + email_)
            res.send(false);
            
    }) 
    
});

app.listen(3001, () =>{
    console.log("server running 3001");
});