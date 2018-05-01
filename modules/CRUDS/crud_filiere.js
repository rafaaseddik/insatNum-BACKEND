const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Class = require('../../models/filiere').model;
var Etudiant = require('../../models/utilisateur').model;


router.post('/create', (req, res) => {
    let new_filiere = new Class(req.body.filiere);
    new_filiere.save().then(result => {
        Class.findById(result._id).then(obj => {
            res.json({
                status: 1,
                data: {
                    filiere: obj
                }
            })
        }).catch(err => res.json({
            status: 0,
            error: {
                message: err
            }
        }))
    })
});





router.post('/update', (req, res) => {
    let filiere = req.body.filiere;
    Class.findByIdAndUpdate(filiere._id, filiere, {new: true}).then(result => {

        res.json({
            status: 1,
            data: {
                filiere: result
            }
        });

    }).catch(err => {
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
            text: "Filiere supprimée"
        }
    })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})

router.get('/getFiliereByID', (req, res) => {
    let id = req.query.id;

    Class.findById(id)
        .then(result => res.json({
            status: 1,
            data: {
                filiere: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getAllFilieres', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Class.find().limit(limit).skip(page * limit)
        .then(result => res.json({
            status: 1,
            data: {
                filieres: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})

router.get('/getFilieresByNiveau', (req, res) => {
    var niveau = req.query.niveau;
    Class.find({niveau: niveau})
        .then(result => res.json({
            status: 1,
            data: {
                filieres: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getFiliereByNom', (req, res) => {
    var nom = req.query.nom;
    Class.find({nom: nom})
        .then(result => res.json({
            status: 1,
            data: {
                filieres: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.post('/addEtudiantToFiliere', (req, res) => {
    var etudiant = req.body.payload.etudiant;
    console.log(etudiant);
    var filiere = req.body.payload.filiere;
    Etudiant.findOneAndUpdate({_id: etudiant._id}, {etu_filiere: filiere._id}, {new: true})
        .then(result => {
            console.log(result);
            var etudiant = Etudiant.findById(result._id).then(
                e=>{
                    res.json({
                        status: 1,
                        data: {
                            result: e
                        }
                    })
                }
            )

        }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

});

router.get('/getEtudiantsByFiliere', (req, res) => {
    var filiereID = req.filiereID;
    Etudiant.find({etu_filiere:filiereID})
        .then(result => {

                    res.json({
                        status: 1,
                        data: {
                            etudiants: result
                        }
                    })

        }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

});
module.exports = router;