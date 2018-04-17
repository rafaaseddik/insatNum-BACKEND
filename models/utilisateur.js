const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UtilisateurSchema = new Schema({
    nom:String,
    prenom:String,
    email:String,
    mot_de_passe:String,
    num_tel:Number,
    date_naissance:Date,
    num_cin:String,
    adresse:String,
    creation_date:{type:Date,default:Date.now()},
    type:{type:String,enum:['ETUDIANT','ENSEIGNANT','EMPLOYE']},
    ens_grade:String,
    ens_type_contrat:{type:String,enum:['CONTRACTUEL','VACATAIRE','EXPERT','AUTRE']},
    etu_num_inscription:Number,
    etu_annee_admission:Number,
    empl_poste:String
});
//Statics
UtilisateurSchema.statics.findUserByEmail = function(email,callback){
    return this.find({email:email},callback);
}
module.exports = {
    model:mongoose.model('Utilisateur',UtilisateurSchema),
    schema : UtilisateurSchema
}
