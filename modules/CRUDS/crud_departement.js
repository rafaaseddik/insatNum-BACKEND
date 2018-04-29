const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Class = require('../../models/departement').model;


router.post('/create', (req, res) => {
    let new_departement = new Class(req.body.departement);
    new_departement.save().then(result =>{
        Class.findById(result._id).populate('chef_departement').then(obj=>{
            res.json({
                status: 1,
                data: {
                    departement: obj
                }
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }))
        })
    })
    .catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));


});

router.post('/update', (req, res) => {
    let departement = req.body.departement;
    Class.findByIdAndUpdate(departement._id, departement, {new: true}).populate('chef_departement').then(result => {

            res.json({
                status: 1,
                data: {
                    departement: result
                }
            });

    }).catch(err=>{
        res.json({
            status: 0,
            error: {
                message: err
            }
        })
    })

})
router.get('/delete', (req, res) => {
    let id = req.query.id;
    Class.remove({_id: id}).then(result => res.json({
        status: 1,
        data: {
            text: "Departement supprimé"
        }
    })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})

router.get('/getDepartementByID', (req, res) => {
    let id = req.query.id;

    Class.findById(id).populate('chef_departement').populate("enseignants").populate('matieres')
        .then(result => res.json({
            status: 1,
            data: {
                departement: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getAllDepartements', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Class.find().limit(limit).skip(page * limit).populate('chef_departement').populate("enseignants").populate('matieres')
        .then(result => res.json({
            status: 1,
            data: {
                departements: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})

router.post('/addEnseignant', (req, res) => {
    let new_enseignant = new Class(req.body.payload.enseignant);
    let departementID = req.body.payload.departementID;
    Class.findOneAndUpdate({_id:departementID},{
        $push:{
            enseignants:new_enseignant._id
        }
    }).then(result =>{
        Class.findById(result._id).populate('chef_departement').populate("enseignants").populate('matieres').then(obj=>{
            res.json({
                status: 1,
                data: {
                    departement: obj
                }
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }))
        })
    })
        .catch(err => res.json({
            status: 0,
            error: {
                message: err
            }
        }));


});
router.post('/addMatiere', (req, res) => {
    let new_matiere = new Class(req.body.payload.matiere);
    let departementID = req.body.payload.departementID;
    Class.findOneAndUpdate({_id:departementID},{
        $push:{
            matieres:new_matiere._id
        }
    }).then(result =>{
        Class.findById(result._id).populate('chef_departement').populate("enseignants").populate('matieres').then(obj=>{
            res.json({
                status: 1,
                data: {
                    departement: obj
                }
            }).catch(err => res.json({
                status: 0,
                error: {
                    message: err
                }
            }))
        })
    })
        .catch(err => res.json({
            status: 0,
            error: {
                message: err
            }
        }));


});

module.exports = router;