const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var CaseEmploiSchema = require('./caseEmploi').schema;

var AbsenceSchema = new Schema({
        etudiant:{type:Schema.Types.ObjectId,ref:"Utilisateur", autopopulate:true},
        date:{type:Date,default:Date.now()},
        case_emploi:{type:Schema.Types.ObjectId,ref:"CaseEmploi",autopopulate:true}
});
AbsenceSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('Absence',AbsenceSchema),
    schema : AbsenceSchema
};