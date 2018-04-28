const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FiliereSchema = new Schema({
    nom:String,
    groupe:Number,
    niveau:Number
});

module.exports = {
    model:mongoose.model('Filiere',FiliereSchema),
    schema : FiliereSchema
}
