const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var DepartementSchema = new Schema({
    nom:String,
    chef_departement:{type:Schema.Types.ObjectId,ref:"Utilisateur",autopopulate:true},
    enseignants : [{type:Schema.Types.ObjectId,ref:"Utilisateur",default:[],autopopulate:true}],
    liste_matieres : [{type:Schema.Types.ObjectId,ref:"Matiere",default:[],autopopulate:true}]
});
DepartementSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('Departement',DepartementSchema),
    schema : DepartementSchema
}
