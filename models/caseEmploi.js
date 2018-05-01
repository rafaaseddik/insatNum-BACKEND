const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var CaseEmploiSchema = new Schema({
    jour:{type:String,enum:["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]},
    heure_debut:{
        hour:Number,minute:Number
    },
    heure_fin:{
        hour:Number,minute:Number
    },
    salle:String,
    matiere:{type:Schema.Types.ObjectId,ref:"Matiere",autopopulate:true},
    type_seance:{type:String,enum:["TP","TD","COURS","TP/TD","CI"]},
    enseignant:{type:Schema.Types.ObjectId,ref:"Utilisateur",autopopulate:true},
    semaine:{type:String,enum:["A","B","TOUS"]}
});
CaseEmploiSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('CaseEmploi',CaseEmploiSchema),
    schema : CaseEmploiSchema
};