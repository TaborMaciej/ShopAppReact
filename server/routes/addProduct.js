const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/add-product", (req, res) =>{
        const productData = req.body.data
        const sqlSelect = `SELECT * FROM system`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            console.log(productData)
            res.send(true)
        })

    })
}