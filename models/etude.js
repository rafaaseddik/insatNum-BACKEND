const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var FiliereSchema = require('./filiere').schema;

var EtudeSchema = new Schema({
    annee_scolaire:String,
    groupe:Number,
    resultat:Double,
    etudiant:{type:Schema.Types.ObjectId,ref:"Utilisateur"},
    filiere : FiliereSchema
});

module.exports = {
    model:mongoose.model('Etude',EtudeSchema),
    schema : EtudeSchema
}
