const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    "user": "root",
    "host": "localhost",
    "password" : "",
    "database" : "capstone"
});

app.get('/users', (req , res) => {
    db.query("SELECT * FROM user", (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get('/saleorder',(req , res) => {
    db.query("select * FROM saleOrder", (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    })
});



app.get('/historys', (req , res) => {
    db.query("SELECT * FROM history", (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get('/historys-users', (req , res) => {
    db.query("SELECT h.Date, h.Time, h.UID_Card, h.Status, u.Name, u.Position FROM history AS h LEFT JOIN user AS u ON h.UID_Card = u.UID_Card ORDER BY h.Date, h.Time", (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.post('/register' ,(req , res) => {
    const email = req.body.email;
    const Name = req.body.Name;
    const Surname = req.body.Surname;
    const password = req.body.password;
    const Id = req.body.Id;
    
    db.query("INSERT INTO user VALUE (?,?,?,?,?)" , [email , Name , Surname , , password , Id], 
    (err, res) => {
        if(err){
            console.log(err);
        }else{
            console.log("Registered completed");
        }
    })
})

app.listen('8080', "0.0.0.0", () => {
    console.log('server is running');
})


