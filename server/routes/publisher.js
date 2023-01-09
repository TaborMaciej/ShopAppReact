const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/publisher", (req, res) =>{
        const sqlSelect = `SELECT ID AS "ID_wydawnictwo", Nazwa FROM wydawnictwo`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(result)
        })

    })
}