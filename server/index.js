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
    const sqlSelectEmployee = "SELECT pracownik.ID, osoba.Imie, haslo.Email, haslo.Haslo FROM pracownik"+
    " INNER JOIN osoba ON pracownik.ID_osoba = osoba.ID " +
    " INNER JOIN haslo ON pracownik.ID_Haslo = haslo.ID " +
    "WHERE haslo.Email = ? AND haslo.Haslo = ?";

    const sqlSelectUser = "SELECT klient.ID, osoba.Imie, haslo.Email, haslo.Haslo FROM klient"+
    " INNER JOIN osoba ON klient.ID_osoba = osoba.ID " +
    " INNER JOIN haslo ON klient.ID_Haslo = haslo.ID " +
    "WHERE haslo.Email = ? AND haslo.Haslo = ?";

    //Check if employee exists
    db.query(sqlSelectEmployee, [email_, password_],(err, result)=>{
        if (err) throw err;
        if (result.length > 0){
            console.log("Succesfully logged the employee: " + email_)
           
            res.send({ ID: result[0].ID, Nazwa: result[0].Imie, isEmployee: true })
            
        } 
        else{    
            //Check if client exists
        
            db.query(sqlSelectUser, [email_, password_],(err, result)=>{
                if (err) throw err;
                if (result.length > 0){
                    console.log("Succesfully logged the client: " + email_)
                   
                    res.send({ ID: result[0].ID, Nazwa: result[0].Imie, isEmployee: false })
                }
                else{
                    console.log("User has not been logged in: " + email_)
                    res.send(false)
                }
                    
            })
        }
    })


});

//get list of games
app.get("/api/games", (req, res) =>{
    const sqlSelect = 'SELECT gra.ID AS "ID_gra", produkt.ID AS "ID_produkt", system.Nazwa AS "Platforma", produkt.Cena_sprzedazy, produkt.Ilosc_sztuk,'+
    ' produkt.Rok_wydania , gra.Nazwa_gry, gatunek.Nazwa AS "Gatunek", wydawnictwo.Nazwa AS "Wydawnictwo", gra.sciezka_okladki AS "Path" FROM gra ' +
    'INNER JOIN produkt ON produkt.ID_gra = gra.ID ' +
    'INNER JOIN system ON produkt.ID_system = system.ID ' +
    'LEFT JOIN gatunek ON gra.ID_gatunek = gatunek.ID ' +
    'LEFT JOIN wydawnictwo ON gra.ID_wydawnictwo = wydawnictwo.ID ' +
    'WHERE produkt.Ilosc_sztuk > 0 ' +
    'ORDER BY gra.Nazwa_gry;'

    db.query(sqlSelect, (err, result) =>{
        if(err) throw err;
        let gameList = {}
        let prevKey = -1
      result.forEach(element => {
                
            if (element.ID_gra != prevKey)
            {
                gameList[element.ID_gra] = {
                    ID_gra: element.ID_gra,
                    Nazwa_gry: element.Nazwa_gry,
                    Gatunek: element.Gatunek,
                    Wydawnictwo: element.Wydawnictwo,
                    Path: element.Path,
                    Platformy: {}
                }
            }

            gameList[element.ID_gra]['Platformy'][element.ID_produkt] = {
                ID_produkt: element.ID_produkt,
                Platforma: element.Platforma,
                Cena_sprzedazy: element.Cena_sprzedazy,
                Ilosc_sztuk: element.Ilosc_sztuk,
                Rok_wydania: element.Rok_wydania
            }
            prevKey = element.ID_gra

        });
        res.send(gameList);
    })
    
});

app.post("/api/order", (req, res) =>{
    const data = req.body.products
    if (data.length <= 0)
        res.send(false)
    let whereClause = ""

    for (let i = 0; i < data.length ; i++){
        whereClause += "(" + "produkt.ID = " + data[i].ProductID + " AND produkt.Ilosc_sztuk >= " + data[i].Amount + ")" 
        if (i + 1 !== data.length)
            whereClause += " OR "
    }

    const sqlSelectGames = "SELECT produkt.ID, produkt.Ilosc_sztuk FROM produkt WHERE " + whereClause + ";"
    console.log(sqlSelectGames)
    
    db.query(sqlSelectGames, (err, result)=>{
        if (err) throw err;
        if (result.length != data.length)
            res.send(false)

    })
});

app.listen(3001, () =>{
    console.log("Server running on port 3001");
});