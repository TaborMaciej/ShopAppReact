const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/add-game", (req, res) =>{
        const data = req.body.data
        const sqlSelect = `SELECT * FROM gra WHERE ID_gatunek = ${mysql.escape(data.ID_gatunek)} AND ID_wydawnictwo = ${mysql.escape(data.ID_wydawnictwo)} AND Nazwa_gry = ${mysql.escape(data.Nazwa_gry)}`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            if (result.length > 0){
                res.send(false)
                return
            }

            const sqlInsert = `INSERT INTO gra (ID, Nazwa_gry, ID_gatunek, ID_wydawnictwo, sciezka_okladki)`+
                        ` VALUES (NULL, ${mysql.escape(data.Nazwa_gry)}, ${mysql.escape(data.ID_gatunek)}, ${mysql.escape(data.ID_wydawnictwo)} , ${mysql.escape(data.sciezka_okladki)})`

            db.query(sqlInsert, (err, result) =>{
                if (err) throw err
                res.send(true)
            })
        })

    })
}