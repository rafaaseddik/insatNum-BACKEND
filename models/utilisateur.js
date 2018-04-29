const mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
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
    img_url:{type:String,default:null},
    type:{type:String,enum:['ETUDIANT','ENSEIGNANT','EMPLOYE']},
    ens_grade:String,
    ens_type_contrat:{type:String,enum:['CONTRACTUEL','VACATAIRE','EXPERT','AUTRE']},
    ens_departement:{type:Schema.Types.ObjectId,ref:"Departement"},
    ens_liste_matiere:[{type:Schema.Types.ObjectId,ref:"Matiere"}],
    etu_num_inscription:Number,
    etu_annee_admission:Number,
    etu_filiere:{type:Schema.Types.ObjectId,ref:"Filiere",autopopulate:true},
    empl_poste:String
});
UtilisateurSchema.plugin(autopopulate);
//Statics
UtilisateurSchema.statics.findUserByEmail = function(email,callback){
    return this.find({email:email},callback);
}
module.exports = {
    model:mongoose.model('Utilisateur',UtilisateurSchema),
    schema : UtilisateurSchema
}
