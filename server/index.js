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
    db.query("SELECT * FROM users", (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.post('/register' ,(req , res) => {
    const username = res.body.username;
    const password = res.body.password;
    const role = res.body.role;
    
    db.query("INSERT INTO users VALUE (?,?,?,?)" , [username , password , role , true], 
    (err, res) => {
        if(err){
            console.log(err);
        }else{
            console.log("Registered completed");
        }
    })
})

app.listen('3001' , () => {
    console.log('server is running');
})


