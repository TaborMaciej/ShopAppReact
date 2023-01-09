const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/system", (req, res) =>{
        const sqlSelect = `SELECT * FROM system`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(result)
        })

    })
}