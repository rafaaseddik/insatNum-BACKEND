const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MatiereSchema = new Schema({
    libelle:String
});

module.exports = {
    model:mongoose.model('Matiere',MatiereSchema),
    schema : MatiereSchema
}
