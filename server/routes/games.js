const mysql = require('mysql');

module.exports = (app, db) => {
    app.get("/api/games", (req, res) =>{
        const sqlSelect = 'SELECT gra.ID AS "ID_gra", produkt.ID AS "ID_produkt", system.Nazwa AS "Platforma", produkt.Cena_sprzedazy, produkt.Ilosc_sztuk,'+
        ' produkt.Rok_wydania , gra.Nazwa_gry, gatunek.Nazwa AS "Gatunek", wydawnictwo.Nazwa AS "Wydawnictwo", gra.sciezka_okladki AS "Path" FROM gra ' +
        'INNER JOIN produkt ON produkt.ID_gra = gra.ID ' +
        'INNER JOIN system ON produkt.ID_system = system.ID ' +
        'LEFT JOIN gatunek ON gra.ID_gatunek = gatunek.ID ' +
        'LEFT JOIN wydawnictwo ON gra.ID_wydawnictwo = wydawnictwo.ID ' +
        'WHERE produkt.Ilosc_sztuk > 0 ' +
        'ORDER BY gra.Nazwa_gry;'
    
        db.query(sqlSelect, (err, result) =>{
            if(err) throw err;
            let gameList = {}
            let prevKey = -1
          result.forEach(element => {
                    
                if (element.ID_gra != prevKey)
                {
                    gameList[element.ID_gra] = {
                        ID_gra: element.ID_gra,
                        Nazwa_gry: element.Nazwa_gry,
                        Gatunek: element.Gatunek,
                        Wydawnictwo: element.Wydawnictwo,
                        Path: element.Path,
                        Platformy: {}
                    }
                }
    
                gameList[element.ID_gra]['Platformy'][element.ID_produkt] = {
                    ID_produkt: element.ID_produkt,
                    Platforma: element.Platforma,
                    Cena_sprzedazy: element.Cena_sprzedazy,
                    Ilosc_sztuk: element.Ilosc_sztuk,
                    Rok_wydania: element.Rok_wydania
                }
                prevKey = element.ID_gra
    
            });
            res.send(gameList);
        })
        
    });
}