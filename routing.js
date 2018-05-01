var express = require('express')
var router = express.Router()

var gestionUtilisateur = require('./modules/gestionUtilisateur.module');
var gestionConversation = require('./modules/gestionConversation.module');
var gestionProgramme = require('./modules/gestionProgramme.module');
var gestionPlanning = require('./modules/gestionPlanning.module');

router.use('/utilisateur',gestionUtilisateur);
router.use('/conversation',gestionConversation);
router.use('/programme',gestionProgramme);
router.use('/planning',gestionPlanning);

module.exports = router;