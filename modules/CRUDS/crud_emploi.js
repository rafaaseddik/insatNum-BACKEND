const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Class = require('../../models/emploi').model;
var Utilisateur = require('../../models/utilisateur').model;

router.post('/create', (req, res) => {
    let new_emploi = new Class(req.body.emploi);

    new_emploi.save().then(result => res.json({
        status: 1,
        data: {
            emploi: result
        }
    })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));


});

router.post('/update', (req, res) => {
    let new_emploi = new Class(req.body.emploi);
    Class.findByIdAndUpdate(new_emploi._id, new_emploi, {new: true}, (err, result) => {
        if (err) {
            handle_error(err, res);
        }
        else {
            res.json({
                status: 1,
                data: {
                    emploi: result
                }
            });
        }
    })

})
router.get('/delete', (req, res) => {
    let id = req.query.id;
    Class.remove({_id: id}).then(result => res.json({
        status: 1,
        data: {
            text: "Emploi supprimé"
        }
    })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
router.get('/getEmploiByFiliereId', (req, res) => {
    var filiereID = req.query.id;
    var semestre = req.query.semestre;

    Class.findOne({groupe: filiereID, semestre: semestre})
        .then(result => res.json({
            status: 1,
            data: {
                matiere: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
router.get('/getEmploiById', (req, res) => {
    let id = req.query.id;

    Class.findById(id)
        .then(result => res.json({
            status: 1,
            data: {
                matiere: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getAllEmplois', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Class.find().limit(limit).skip(page * limit)
        .then(result => res.json({
            status: 1,
            data: {
                emplois: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})

router.post('/addCaseToEmploi', (req, res) => {
    let case_emploi = req.body.payload.case_emploi;
    let emploi_id = req.body.payload.emploiID;

    Class.findOneAndUpdate({_id: emploi_id}, {
        $push: {
            cases: case_emploi
        }
    }, {new: true}).then(result => {
        res.json({
            status: 1,
            data: {
                emploi: result
            }
        });
    }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));


});
router.get('/getEtudiantsByCaseEmploiID', (req, res) => {
    var caseEmploiID = req.query.caseEmploiID;

    Class.findOne({
        cases: {
            $elemMatch:
                {_id:caseEmploiID}

        }
    }).then(emploi=>{
        if(emploi==null){
            res.json({
                status:2,
                message:"La case emploi ne se trouve dans aucun emploi"
            })
            res.end();
        }
        else{
            Utilisateur.find({etu_filiere:emploi.groupe}).then(utilisateurs=>{
                res.json({
                    status:1,
                    data:{
                        etudiants:utilisateurs
                    }
                })
            }).catch(err=>{
                res.json({
                    status:0,
                    messages:err
                })
            })
        }
    }).catch(err=>{
        res.json({
            status:0,
            messages:err
        })
    });
})

module.exports = router;