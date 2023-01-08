const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/checkEmail", (req, res) =>{
        const email = req.body.email
        const sqlSelect = `SELECT ID, Email FROM haslo WHERE Email = ${mysql.escape(email)}`

        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(result)
            if (result.length > 0){
                console.log(email + " already exists")
                res.send(true)
                return
            }
            
            res.send(false)
            
        })
    })
}