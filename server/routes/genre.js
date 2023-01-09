const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/genre", (req, res) =>{
        const sqlSelect = `SELECT * FROM gatunek`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(result)
        })

    })
}