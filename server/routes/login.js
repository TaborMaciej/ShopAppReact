const mysql = require('mysql');

module.exports = (app, db) => {
    app.post("/api/login", (req, res) => {

        const email_ = req.body.email;
        const password_ = req.body.password;
        const sqlSelectEmployee = `SELECT pracownik.ID, osoba.Imie, haslo.Email, haslo.Haslo FROM pracownik`+
        ` INNER JOIN osoba ON pracownik.ID_osoba = osoba.ID ` +
        ` INNER JOIN haslo ON pracownik.ID_Haslo = haslo.ID ` +
        `WHERE haslo.Email = ${mysql.escape(email_)} AND haslo.Haslo = ${mysql.escape(password_)}`;
    
        const sqlSelectUser = `SELECT klient.ID, osoba.Imie, haslo.Email, haslo.Haslo FROM klient`+
        ` INNER JOIN osoba ON klient.ID_osoba = osoba.ID ` +
        ` INNER JOIN haslo ON klient.ID_Haslo = haslo.ID ` +
        `WHERE haslo.Email = ${mysql.escape(email_)} AND haslo.Haslo = ${mysql.escape(password_)}`;
    
        //Check if employee exists
        db.query(sqlSelectEmployee,(err, result)=>{
            if (err) throw err;
            if (result.length > 0){
                console.log("Succesfully logged the employee: " + email_)
                res.send({ ID: result[0].ID, Nazwa: result[0].Imie, isEmployee: true })
                return
            }   
        
                //Check if client exists
            
            db.query(sqlSelectUser,(err, result)=>{
                if (err) throw err;
                if (result.length > 0){
                    console.log("Succesfully logged the client: " + email_)
                    res.send({ ID: result[0].ID, Nazwa: result[0].Imie, isEmployee: false })
                    return
                }
                else{
                    console.log("User has not been logged in: " + email_)
                    res.send(false)
                    return
                }
            })
        })
        
    
    })
}