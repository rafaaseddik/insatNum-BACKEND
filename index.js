const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://root:khalilrafaa12@ds119090.mlab.com:19090/insat_numerique');
mongoose.Promise = global.Promise;

const routing = require('./routing');
var port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started")
});
app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','Content-Type');
    res.set('Content-type','application/json');
    next();
})
app.use(routing);