var express = require('express')
var router = express.Router()

var gestionUtilisateur = require('./modules/gestionUtilisateur.module');
var gestionConversation = require('./modules/gestionConversation.module');

router.use('/utilisateur',gestionUtilisateur);
router.use('/conversation',gestionConversation);

module.exports = router;