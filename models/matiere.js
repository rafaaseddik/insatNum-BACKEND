const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FiliereSchema = new Schema({
    libelle:String,
    niveau:Number,
    departement:{type:Schema.Types.ObjectId,ref:"Departement"},
    liste_enseignant:[{type:Schema.Types.ObjectId,ref:"Utilisateur"},]
});

module.exports = {
    model:mongoose.model('Filliere',FiliereSchema),
    schema : FiliereSchema
}
