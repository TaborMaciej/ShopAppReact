const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/userOrders", (req, res) =>{
        const userID = req.body.userID
        if(userID === undefined){
            res.send({})
            re
        }

        const sqlSelectProducts = `SELECT zamowienie.ID AS "ID_zamowienie", zamowienie.Data_zamowienia, status.Status, gra.Nazwa_gry,` +
        ` system.Nazwa, produkt.Cena_sprzedazy, zamowienie_produkt.Ilosc, produkt.ID AS "ID_produkt" FROM zamowienie` +
        ` INNER JOIN status ON status.ID = zamowienie.ID_status` +
        ` INNER JOIN zamowienie_produkt ON zamowienie_produkt.ID_zamowienie = zamowienie.ID` +
        ` INNER JOIN produkt ON zamowienie_produkt.ID_produkt = produkt.ID` +
        ` INNER JOIN gra ON produkt.ID_gra = gra.ID` +
        ` INNER JOIN system ON system.ID = produkt.ID_system` +
        ` WHERE zamowienie.ID_klient = ${mysql.escape(userID)}`+
        ` ORDER BY zamowienie.ID` 
        db.query(sqlSelectProducts, (err, result) =>{
            if (err) throw err

            let ordersList = {}
            let prevKey = -1
            result.forEach(element => {
                        
                if (element.ID_zamowienie != prevKey)
                {
                    ordersList[element.ID_zamowienie] = {
                        ID_zamowienie: element.ID_zamowienie,
                        Data: element.Data_zamowienia,
                        Status: element.Status,
                        Produkty: {}
                    }
                }
        
                ordersList[element.ID_zamowienie]['Produkty'][element.ID_produkt] = {
                    ID_produkt: element.ID_produkt,
                    Nazwa_gry: element.Nazwa_gry,
                    Cena: element.Cena_sprzedazy,
                    Ilosc: element.Ilosc
                }
                prevKey = element.ID_zamowienie
        
            });
            console.log(ordersList)
            res.send(ordersList)
        })
    })

}