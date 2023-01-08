const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/voivodeships", (req, res) =>{
        const sqlSelect = `SELECT * FROM wojewodztwo ORDER BY Nazwa`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(result)
        })
    })
}