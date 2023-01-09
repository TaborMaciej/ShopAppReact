const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/status", (req, res) =>{
        const sqlUpdate = `UPDATE zamowienie SET ID_status = ${mysql.escape(req.body.status)} WHERE zamowienie.ID = ${mysql.escape(req.body.ID)}`
        console.log("ID: " + req.body.ID)
        console.log("ID_statu: " + req.body.status)
        db.query(sqlUpdate, (err, result) =>{
            if (err) throw err
            console.log(result)
            res.send(true)
        })

    })
}