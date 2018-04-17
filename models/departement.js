const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DepartementSchema = new Schema({
    nom:String,
    chef_departement:{type:Schema.Types.ObjectId,ref:"Utilisateur"},
    enseignants : [{type:Schema.Types.ObjectId,ref:"Utilisateur"}],
    liste_matieres : [{type:Schema.Types.ObjectId,ref:"Matiere"}]
});

module.exports = {
    model:mongoose.model('Departement',DepartementSchema),
    schema : DepartementSchema
}
