const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/getGame", (req, res) =>{
        const sqlSelect = `SELECT ID AS "ID_gra", Nazwa_gry FROM gra`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(result)
        })

    })
}