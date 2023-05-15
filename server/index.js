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

app.post('/register' ,(req , res) => {
    const email = res.body.email;
    const Name = res.body.Name;
    const Surname = res.body.Surname;
    const password = res.body.password;
    const Id = res.body.Id;
    
    db.query("INSERT INTO user VALUE (?,?,?,?,?)" , [email , Name , Surname , , password , Id], 
    (err, res) => {
        if(err){
            console.log(err);
        }else{
            console.log("Registered completed");
        }
    })
})

app.listen('8080' , "0.0.0.0", () => {
    console.log('server is running');
})


