const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/status", (req, res) =>{
        //req.body.status 
        res.send(true)
        const sqlUpdate = ``

        db.query(sqlUpdate)

        })
}