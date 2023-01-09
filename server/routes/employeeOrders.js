const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/employeeOrders", (req, res) =>{
        const userID = req.body.employeeID
        if(userID === undefined){
            res.send({})
            return
        }

        const sqlSelectProducts = `SELECT zamowienie.ID AS "ID_zamowienie", zamowienie.Data_zamowienia, status.Status, gra.Nazwa_gry,`+
        ` system.Nazwa AS "System", zamowienie_produkt.Ilosc, produkt.ID AS "ID_produkt",` +
        ` adres.Ulica, adres.Kod_pocztowy, adres.Numer_budynku, adres.Numer_mieszkania, miasto.Nazwa AS "Miasto",` +
        ` wojewodztwo.Nazwa AS "Wojewodztwo" FROM zamowienie` +
        ` INNER JOIN status ON status.ID = zamowienie.ID_status` +
        ` INNER JOIN zamowienie_produkt ON zamowienie_produkt.ID_zamowienie = zamowienie.ID` +
        ` INNER JOIN produkt ON zamowienie_produkt.ID_produkt = produkt.ID` +
        ` INNER JOIN gra ON produkt.ID_gra = gra.ID` +
        ` INNER JOIN system ON system.ID = produkt.ID_system` +
        ` INNER JOIN klient ON klient.ID = zamowienie.ID_klient` +
        ` INNER JOIN osoba ON osoba.ID = klient.ID_osoba` +
        ` INNER JOIN adres ON adres.ID = osoba.ID_adres` +
        ` INNER JOIN miasto ON adres.ID_miasto = miasto.ID` +
        ` INNER JOIN wojewodztwo ON miasto.ID_wojewodztwo = wojewodztwo.ID` +
        ` WHERE zamowienie.ID_pracownik = ${mysql.escape(userID)}`+
        ` ORDER BY zamowienie.ID;`
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
                        Ulica: element.Ulica,
                        Kod_pocztowy: element.Kod_pocztowy,
                        Numer_budynku: element.Numer_budynku,
                        Numer_mieszkania: element.Numer_mieszkania,
                        Miasto: element.Miasto,
                        Wojewodztwo: element.Wojewodztwo,
                        Produkty: {}
                    }
                }
        
                ordersList[element.ID_zamowienie]['Produkty'][element.ID_produkt] = {
                    ID_produkt: element.ID_produkt,
                    Nazwa_gry: element.Nazwa_gry,
                    System: element.System,
                    Ilosc: element.Ilosc
                }
                prevKey = element.ID_zamowienie
        
            });
            console.log(ordersList)
            res.send(ordersList)
        })
    })

}