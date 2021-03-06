const http = require('http');
const { constants } = require('buffer');
const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const OPTIONS = 'OPTIONS';
const DELETE = 'DELETE';
const urlParser = require('url');
const mysql = require("mysql");
const express = require("express");
const exp = express();
const { runInNewContext } = require('vm');
const endPoint = "/COMP351/labs/individual/server"


const db = mysql.createConnection({
    host: "localhost",
    user: "chanzomu_nodemysql",
    password: "nodemysql123",
    database: "chanzomu_nodemysql"
});

exp.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type, Authorization, Content-Length, X-Request-Width");
    next();
});

exp.post(endPoint, (req, res) => {

    
    let body = "";
    req.on('data', function (chunk){
       console.log("chunk is "+ JSON.stringify(chunk));
       if(chunk !== null){
           body += chunk;
           console.log("body is =")
           console.log(JSON.stringify(body));

       }
   });

     req.on('end', function(){
       let parsedBody = JSON.parse(body);
       
   
       let index = parsedBody.id;
       let quote = parsedBody.body;
           

        db.query("REPLACE INTO `individual`(`id`, `quote`) VALUES (" + index + ',' + quote + ')', function (err, result) {
            if (err) throw err;
        });
    });
});

exp.delete(endPoint, (req, res) => {

    let body = "";

    req.on('data', function (chunk){
       console.log("chunk is "+ JSON.stringify(chunk));
       if(chunk !== null){
           body += chunk;
       }
   })
   
   req.on('end', function()
   {
       let parsedBody = JSON.parse(body);

   
       let index = parsedBody.id;
       let quote = parsedBody.body;

           
   
       
    db.query("DELETE FROM individual WHERE ( id = "+ index + ')', function (err,result){
           if(err) throw err;

       })

   })
   console.log("inside delete")
})

exp.get(endPoint, (req, res) =>{
    console.log("connected, inside get")
    db.query("SELECT * FROM `individual`", function (err, result){
        if (err) throw err;
        res.send(result);
    });
});




exp.listen();