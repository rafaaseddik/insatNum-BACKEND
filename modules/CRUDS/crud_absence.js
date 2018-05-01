const express = require('express');
const router = express.Router();
const md5 = require('md5');

var NotificationManager = require('../gestionNotification.module');

var Class = require('../../models/absence').model;

router.post('/create', (req, res) => {
    let new_absence = req.body.payload.absence;
    let liste_etudiants = req.body.payload.liste_etudiants;
    var promises = [];
    liste_etudiants.forEach(etudiant => {
        var current_absence = new Class(new_absence);
        current_absence.etudiant = etudiant;

        promises.push(current_absence.save());
        NotificationManager.sendNotification("ABSENCE",current_absence,etudiant);

    });

    Promise.all(promises).then(values=>{
        res.json({
            status: 1,
            data: {
                absences: values
            }
        });
    }).catch(errors=>{

        res.json({
            status: 0,
            errors: errors
        })
    })





});

router.post('/update', (req, res) => {
    let matiere = req.body.matiere;
    Class.findByIdAndUpdate(matiere._id, matiere, {new: true}, (err, result) => {
        if (err) {
            handle_error(err, res);
        }
        else {
            res.json({
                status: 1,
                data: {
                    matiere: result
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
            text: "Matiere supprimé"
        }
    })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));
})
router.get('/getMatiereByID', (req, res) => {
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
router.get('/getAllAbsence', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Class.find().limit(limit).skip(page * limit)
        .then(result => res.json({
            status: 1,
            data: {
                absences: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getAllAbsencesByUserID', (req, res) => {
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    let userID = req.query.userID;

    Class.find({etudiant:userID}).limit(limit).skip(page * limit)
        .then(result => res.json({
            status: 1,
            data: {
                absences: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
module.exports = router;