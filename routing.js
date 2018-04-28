var express = require('express')
var router = express.Router()

var gestionUtilisateur = require('./modules/gestionUtilisateur.module');
var gestionConversation = require('./modules/gestionConversation.module');
var gestionProgramme = require('./modules/gestionProgramme.module');

router.use('/utilisateur',gestionUtilisateur);
router.use('/conversation',gestionConversation);
router.use('/programme',gestionProgramme);

module.exports = router;