const { request } = require('http');
const express = require('express');
var bodyParser=require("body-parser");
const mysql = require('mysql');
const app = express();
let cors = require("cors");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dtiya@123",
    database: "carealot",
    port: "3306"
});

app.use(cors());

connection.connect((err) =>{
    if(err){
        throw err;
    } else{
        console.log("Connection Successful!");
    }
});

user_db = []
app.get("/get", function (req,res) {
    connection.query(`Select email, password1 from signup`, function (err, results, fields) {
        for(let i = 0; i<results.length; i++){
            user_db.push([results[i].email, results[i].password1])
        }
        console.log("Sending the data from the database(signup) to the function.js file")
        res.send(user_db)
    })
    user_db = []
})


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());
app.use(cors());
app.post("/", function (req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let email = req.body.email;
    let password1 = req.body.password1;
    let cnfpassword = req.body.cnfpassword;
    connection.query(`Insert into signup(firstname, lastname,phone, email, password1,cnfpassword) values ('${firstname}', '${lastname}', ${phone}, '${email}','${password1}','${cnfpassword}')`);
    res.send(`Registration Succesfully`)
})


const port = process.env.port || 5000;
app.listen(port);

console.log("App is listening on port " + port);

