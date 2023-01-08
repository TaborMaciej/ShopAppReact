const mysql = require('mysql');

module.exports = async function register(app, db){
    app.post("/api/register", async (req, res) =>{
        const data = req.body.data
        const sqlCitySelect = `SELECT ID, Nazwa, ID_wojewodztwo FROM miasto WHERE Nazwa = ${mysql.escape(data.City)} AND ID_wojewodztwo = ${mysql.escape(data.Voivodeship)}`
        
        let cityID
        await new Promise((resolve, reject) =>{
            db.query(sqlCitySelect, async (err, result) =>{
                if (err) reject(err)
                
                //City record exists
                if (result.length > 0){
                    cityID = result[0].ID
                }

                //City record doesnt exist. Creating one
                else{
                    const sqlInsertCity = `INSERT INTO miasto (ID, Nazwa, ID_wojewodztwo) VALUES (NULL, ${mysql.escape(data.City)}, ${mysql.escape(data.Voivodeship)})`
                    await new Promise((resolve, reject) => {
                        db.query(sqlInsertCity, (err, result) =>{
                            if(err) reject(err)
                            cityID =  result.insertId
                            resolve()
                        })
                    })      
                }

                resolve()
            })
        })

        //Got the cityID
        //Insert address
        const House_nr = (data.House === "" ? null : data.House)
        const sqlInsertAddress = `INSERT INTO adres (ID, ID_miasto, Ulica, Kod_pocztowy, Numer_budynku  , Numer_mieszkania) `+
                                `VALUES (NULL, ${mysql.escape(cityID)}, ${mysql.escape(data.Street)}, ${mysql.escape(data.Zip)}, ${mysql.escape(data.Building)}, ${mysql.escape(House_nr)})`

        let addresID
        await new Promise((resolve, reject) =>{
            db.query(sqlInsertAddress, async (err, result) =>{
                if (err) reject(err)
                addresID = result.insertId
                resolve()
            })
        })

        //Insert Person
        const phone = (data.Phone === "" ? null : data.Phone)
        const birthday = (data.Birthday === "" ? null : data.Birthday)
        sqlInsertPerson = `INSERT INTO osoba (ID, Imie, Nazwisko, Telefon, Data_urodzenia, ID_adres)`+
                        ` VALUES (NULL, ${mysql.escape(data.Name)}, ${mysql.escape(data.LastName)}, ${mysql.escape(phone)}, ${mysql.escape(birthday)}, ${mysql.escape(addresID)})`

        let personID
        await new Promise((resolve, reject) =>{
            db.query(sqlInsertPerson, async (err, result) =>{
                if (err) reject(err)
                personID = result.insertId
                resolve()
            })
        })

        //Insert Password 
        const sqlInsertPassword = `INSERT INTO haslo (ID, Haslo, Email)`+
                                ` VALUES (NULL, ${mysql.escape(data.Password)}, ${mysql.escape(data.Email)})`
        let passID
        await new Promise((resolve, reject) =>{
            db.query(sqlInsertPassword, async (err, result) =>{
                if (err) reject(err)
                passID = result.insertId
                resolve()
            })
        })

        //Insert Client
        const sqlInsertClient = `INSERT INTO klient (ID, ID_osoba, ID_Haslo)`+
                                ` VALUES (NULL, ${mysql.escape(personID)}, ${mysql.escape(passID)})`

        await new Promise((resolve, reject) =>{
            db.query(sqlInsertClient, async (err, result) =>{
                if (err) reject(err)
                console.log("Succesfully created user: " + result.insertId)
                resolve()
            })
        })
        
        res.send(true)

    })
}
