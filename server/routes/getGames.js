const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/get-games", (req, res) =>{
        const sqlSelect = `SELECT * FROM gra`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            res.send(result)
        })

    })
}