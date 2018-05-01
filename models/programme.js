const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');
var ProgrammeSchema = new Schema({
    semestre:Number,
    filieres:[{type:Schema.Types.ObjectId,ref:"Filiere",autopopulate:true}],
    matieres : [{type:Schema.Types.ObjectId,ref:"Matiere",autopopulate:true}]
});
ProgrammeSchema.plugin(autopopulate);
module.exports = {
    model:mongoose.model('Programme',ProgrammeSchema),
    schema : ProgrammeSchema
};