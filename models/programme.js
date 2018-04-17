const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProgrammeSchema = new Schema({
    semestre:Number,
    filieres:[{type:Schema.Types.ObjectId,ref:"Filiere"}],
    matieres : [{type:Schema.Types.ObjectId,ref:"Matiere"}]
});

module.exports = {
    model:mongoose.model('Programme',ProgrammeSchema),
    schema : ProgrammeSchema
}
