const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Utilisateur = require('../models/utilisateur').model;
var Matiere = require('../models/matiere').model;
var Programme = require('../models/programme').model;
var Filiere = require('../models/filiere').model;

var CRUD_Matiere = require('./CRUDS/crud_matiere');
var CRUD_Departement = require('./CRUDS/crud_departement');
var CRUD_Filiere = require('./CRUDS/crud_filiere');

router.use('/matiere', CRUD_Matiere);
router.use('/departement', CRUD_Departement);
router.use('/filiere', CRUD_Filiere);

router.post('/create', (req, res) => {
    var semestre = req.body.payload.semestre ? req.body.payload.semestre : 1;
    var filiere = req.body.payload.filiere;
    var niveau = req.body.payload.niveau;
    var filieres = [];
    Filiere.find({nom: filiere, niveau: niveau}).then(result => {
        if (result.length <= 0) {
            res.json({
                status: 2,
                message: "Aucune filiere trouvée"
            })
            res.end();
        }
        else {
            result = result.map(elt => elt._id).sort();
            Programme.find({filieres: result, semestre: semestre}).then(f => {
                if (f.length > 0) {
                    res.json({
                        status: 2,
                        message: "Une autre instance ayant les memes filieres dans le meme semestre a été trouvé"
                    })
                    res.end();
                }
                else {
                    var program = new Programme();
                    program.filieres = result;
                    program.semestre = semestre;
                    program.save().then(created => {
                        res.json({
                            status: 1,
                            data: {
                                programme: created
                            }
                        })
                    }).catch(err => res.json({
                        status: 0,
                        error: {
                            message: err
                        }
                    }));
                }
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }));
        }
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/all', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Programme.find().limit(limit).skip(page * limit).then(result => {
        res.json({
            status: 1,
            data: {programme: result}
        });
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

});
router.post('/addMatiereToProgramme', (req, res) => {
    var matieres = req.body.payload.matieres;
    var programmeID = req.body.payload.programmeID;
    Programme.findById(programmeID,{},{autopopulate:false}).then(result => {
        if (result == null) {
            res.json({
                status: 2,
                message: "l'ID du programme fourni est invalide"
            })
            res.end();
        }else{
            matieres.forEach(elt=>{
                console.log(result)
                if(result.matieres.indexOf(elt)==-1){
                    result.matieres.push(elt);
                }
            })
            Programme(result).save().then(created => {
                res.json({
                    status: 1,
                    data: {
                        programme: created
                    }
                })
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }));
        }
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
router.get('/getProgrammeByFiliere',(req,res)=>{
    var filiere = req.query.filiere;
    var niveau = req.query.niveau;
    var semestre = req.query.semestre;
    Filiere.find({nom: filiere, niveau: niveau}).then(result => {
        if (result.length <= 0) {
            res.json({
                status: 2,
                message: "Aucune filiere trouvée"
            })
            res.end();
        }
        else {
            result = result.map(elt => elt._id).sort();
            Programme.findOne({filieres: result, semestre: semestre}).then(f => {
                if (f!=null) {
                    res.json({
                        status: 1,
                        data: {
                            programme: f
                        }
                    })
                    res.end();
                }
                else {
                    res.json({
                        status: 2,
                        message:"programme introuvable"
                    })
                    res.end();
                }
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }));
        }
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
router.get('/deleteMatiereFromProgramme',(req,res)=>{
    var matiereID = req.query.matiereID;
    var programmeID = req.query.programmeID;
    Programme.findById(programmeID,{},{autopopulate:false}).then(result=>{
        if(result==null){
            res.json({
                status: 2,
                message: "l'ID du programme fourni est invalide"
            })
            res.end();
        }
        else{
            if(result.matieres.indexOf(matiereID)==-1){
                res.json({
                    status: 2,
                    message: "l'ID de la matiere fourni est invalide"
                })
                res.end();
            }else{
                result.matieres.splice(result.matieres.indexOf(matiereID),1);
                Programme(result).save().then(created => {
                    res.json({
                        status: 1,
                        data: {
                            programme: created
                        }
                    })
                }).catch(err => res.json({
                    status: 0,
                    error: {
                        message: err
                    }
                }));
            }
        }
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
module.exports = router;