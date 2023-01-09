const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/add-product", (req, res) =>{
        const data = req.body.data
        const sqlSelect = `SELECT * FROM produkt WHERE ID_gra = ${data.ID_gra} AND ID_system = ${data.ID_system}`
        db.query(sqlSelect, (err, result) =>{
            if (err) throw err
            if (result.length > 0){
                res.send(false)
                return
            }

            const rok = (data.Rok_wydania === "" ? null : data.Rok_wydania)
            const sqlInsert = `INSERT INTO produkt (ID, Cena_sprzedazy, Cena_zakupu, Rok_wydania, Ilosc_sztuk, ID_system, ID_gra)`  +
                              ` VALUES (NULL, ${mysql.escape(data.Cena_sprzedazy)}, ${mysql.escape(data.Cena_zakupu)}, ${mysql.escape(rok)},` +
                              `${mysql.escape(1000)}, ${mysql.escape(data.ID_system)}, ${mysql.escape(data.ID_gra)})` 
            db.query(sqlInsert, (err, result) =>{
                if (err) throw err
                res.send(true)
            })
        })

    })
}