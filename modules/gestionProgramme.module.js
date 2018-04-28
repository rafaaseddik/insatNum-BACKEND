const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Utilisateur = require('../models/utilisateur').model;
var Matiere = require('../models/matiere').model;
var Programme= require('../models/programme').model;
var Filiere = require('../models/filiere').model;

var CRUD_Matiere = require('./CRUDS/crud_matiere');
var CRUD_Departement = require('./CRUDS/crud_departement');
var CRUD_Filiere = require('./CRUDS/crud_filiere');

router.use('/matiere',CRUD_Matiere);
router.use('/departement',CRUD_Departement);
router.use('/filiere',CRUD_Filiere);

module.exports = router;