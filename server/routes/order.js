const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/order", (req, res) =>{
        if (req.body.user.isEmployee || Object.keys(req.body.user).length === 0){
            res.send(false)
            return
        }

        const clientID = req.body.user.ID
        const date = new Date().toISOString().slice(0, 10);
        const employeeID = clientID % 4 + 1

        const sqlInsertMainOrder = `INSERT INTO zamowienie (ID, Data_zamowienia, ID_status, ID_klient, ID_pracownik) VALUES (NULL, ${date}, "3", ${clientID}, ${employeeID})`
        db.query(sqlInsertMainOrder, (err, result) =>{
            if(err) throw err;
            const insertID = result.insertId;
            
            for (const element of req.body.products) {
                const sqlInsert = `INSERT INTO zamowienie_produkt (ID, Ilosc, ID_produkt, ID_zamowienie) VALUES (NULL, ${element.Amount}, ${element.ProductID}, ${insertID})`;
                db.query(sqlInsert, (err, result) => {
                    if (err) throw err;
                })

                const sqlUpdate = `UPDATE produkt SET Ilosc_sztuk = Ilosc_sztuk - ${element.Amount} WHERE produkt.ID = ${element.ProductID}`;
                db.query(sqlUpdate, (err, result) => {
                    if (err) throw err;
                })
            }


        })
        res.send(true)
    });
}