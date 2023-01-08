const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/available", (req, res) =>{
        const data = req.body.products
        if (data.length <= 0)
            res.send(false)
        let whereClause = ""
    
        for (let i = 0; i < data.length ; i++){
            whereClause += `(produkt.ID = ${mysql.escape(data[i].ProductID)} AND produkt.Ilosc_sztuk >= ${mysql.escape(data[i].Amount)})` 
            if (i + 1 !== data.length)
                whereClause += ` OR `
        }
    
        const sqlSelectGames = `SELECT produkt.ID, produkt.Ilosc_sztuk FROM produkt WHERE ${whereClause};`
        
        db.query(sqlSelectGames, (err, result)=>{
            if (err) throw err;
            if (result.length != data.length)
                res.send(false)
            else
                res.send(true)
        })
    });
}