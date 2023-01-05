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

app.post("/api/login", (req, res) => {

    const email_ = req.body.email;
    const password_ = req.body.password;
    let send_back;
    const sqlSelect = "SELECT osoba.ID, osoba.Imie, osoba.Email FROM osoba INNER JOIN haslo ON osoba.ID_haslo = haslo.ID " +
    "WHERE osoba.Email = ? AND haslo.Nazwa = ?";
    db.query(sqlSelect, [email_, password_],(err, result)=>{
        if (err) throw err;
        if (result.length > 0){
            console.log("Succesfully logged the user: " + email_)
           
            res.send({ ID: result[0].ID, Nazwa: result[0].Imie })
        }
        else{
            console.log("User has not been logged in: " + email_)
            res.send(false)
        }
            
    }) 
     /*
    //start change //Error on POOL_CLOSED. Try to drain the pool first
    
    console.log("Before closure");
    db.end((err) => {
        if (err) throw err;
        console.log("Closed existing connection"); //<- this log doesnt go through
    });
    console.log("After closure"); //this log does

    db = mysql.createPool({
        connectionLimit: 10,
        port: "3306",
        host: "localhost",
        user: "klient",
        password: "password",
        database: "official_gry"
    });
    console.log("i did it");
    //end change
    */

});

//get list of games
app.get("/api/games", (req, res) =>{
    const sqlSelect = 'SELECT gra.ID, gra.Nazwa_gry, gatunek.Nazwa AS "Gatunek", wydawnictwo.Nazwa AS "Wydawnictwo", gra.sciezka_okladki AS "PATH" FROM gra ' +
                    'LEFT JOIN gatunek ON gra.ID_gatunek = gatunek.ID ' +
                    'LEFT JOIN wydawnictwo ON gra.ID_wydawnictwo = wydawnictwo.ID'

    db.query(sqlSelect, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
    
});

app.listen(3001, () =>{
    console.log("Server running on port 3001");
});