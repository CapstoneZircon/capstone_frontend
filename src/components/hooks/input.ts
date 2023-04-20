import React from "react";

const mysql = require("mysql2")

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'capstone',
});

// simple query
connection.query(
  'INSERT * INTO `user`',
  function(err:React.ChangeEvent<HTMLInputElement>, results:string, fields:string) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

export default function empty(){
  
    
    
};