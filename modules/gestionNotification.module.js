const express = require('express');
const router = express.Router();
const md5 = require('md5');

/*firebase config*/
var firebase = require("firebase/app");
/*require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");
*/
var config = {
    apiKey: "AIzaSyDKhRaSZQdpuwwsrPDR-1IwG75iHyY8mkk",
    authDomain: "insatnumerique2.firebaseapp.com",
    databaseURL: "https://insatnumerique2.firebaseio.com",
    projectId: "insatnumerique2",
    storageBucket: "insatnumerique2.appspot.com",
    messagingSenderId: "108455283305"
};
firebase.initializeApp(config);

//const messaging = firebase.messaging();


const Notification = require("../models/notification").model;


router.get('/getNotificationsByUserID',(req,res)=>{
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    let utilisateurID = req.query.utilisateurID;
    Notification.find({utilisateur:utilisateurID}).limit(limit).skip(page * limit)
        .then(result => res.json({
            status: 1,
            data: {
                notifications: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})

module.exports = {
    sendNotification:(type,absence,utilisateur)=>{
     var notif = new Notification();
     notif.type = type;
     notif.absence = absence;
     notif.utilisateur = utilisateur;
     notif.save().then(notification=>{
    })
    },
    router:router
}