const express = require('express');
const router = express.Router();
const md5 = require('md5');
const core = require('./core.module');


var CRUD_Emploi = require('./CRUDS/crud_emploi');
var CRUD_Absence = require('./CRUDS/crud_absence');

var Emploi = require('../models/emploi').model;
var CaseEmploi = require('../models/caseEmploi').model;


router.use('/emploi',CRUD_Emploi);
router.use('/absence',CRUD_Absence);

router.get('/getCurrentCaseEmploiByFiliere',(req,res)=>{
    var filiereID = req.query.filiereID;
    Emploi.findOne({
        annee_scolaire:core.getAnneeScolaire(),
        semestre:core.getSemestre(),
        groupe:filiereID
    }).then(emploi=>{
        if(emploi==null){
            res.json({
                status:2,
                message:"Cette filiere n'a pas d'emplois"});
        }
        var now = new Date();
        var current_time = {
            hour:now.getHours(),
            minute:now.getMinutes()
        }
        var current_case = null;
        var cases = emploi.cases.find((_case)=>{
            return (_case.semaine==core.getSemaine()||_case.semaine=="TOUS")&&(_case.jour==core.getDay())&&core.date_isGreater(current_time,_case.heure_debut)&&core.date_isGreater(_case.heure_fin,current_time);
        })
        res.json({
            status:1,
            data:{case:cases}});



    }).catch(err=>{
        res.json({
            status:0,
            message:err
        })
    })
})
router.get('/getCurrentCaseEmploiByEnseignatID',(req,res)=>{
    var enseignantID = req.query.enseignantID;
    Emploi.findOne({
        annee_scolaire:core.getAnneeScolaire(),
        semestre:core.getSemestre()
    }).then(emploi=>{
        var now = new Date();
        var current_time = {
            hour:now.getHours(),
            minute:now.getMinutes()
        }
        var current_case = null;
        var cases = emploi.cases.find((_case)=>{
            return (_case.enseignant._id==enseignantID)&&(_case.semaine==core.getSemaine(),_case.semaine=="TOUS")&&(_case.jour==core.getDay())&&core.date_isGreater(current_time,_case.heure_debut)&&core.date_isGreater(_case.heure_fin,current_time);
        })
        res.json({
            status:1,
            data:{case:cases}}
            );



    }).catch(err=>{
        res.json({
            status:0,
            message:err
        })
    })
})
module.exports = router;