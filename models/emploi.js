const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var CaseEmploiSchema = require('./caseEmploi').schema;

var EmploiSchema = new Schema({
    annee_scolaire:Number,
    semestre:Number,
    date_debut:Date,
    date_expiration:Date,
    groupe:{type:Schema.Types.ObjectId,ref:"Filiere",autopopulate:true},
    cases : [{type:Schema.Types.ObjectId,ref:"CaseEmploi",autopopulate:true}]

});
EmploiSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('Emploi',EmploiSchema),
    schema : EmploiSchema
};