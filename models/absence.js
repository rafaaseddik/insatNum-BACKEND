const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var AbsenceSchema = new Schema({
    enseignant:{type:Schema.Types.ObjectId,ref:"Utilisateur", autopopulate:true},
    etudiant:{type:Schema.Types.ObjectId,ref:"Utilisateur", autopopulate:true},
    date:{type:Date,default:Date.Now()}
});
AbsenceSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('Absence',AbsenceSchema),
    schema : AbsenceSchema
};