const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/insat_numerique');
mongoose.Promise = global.Promise;

const routing = require('./routing');

app.listen("3000",()=>{
    console.log("server started")
});
app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','Content-Type');
    res.set('Content-type','application/json');
    next();
})
app.use(routing);