const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FiliereSchema = new Schema({
    nom:String,
    niveau:Number
});

module.exports = {
    model:mongoose.model('Filliere',FiliereSchema),
    schema : FiliereSchema
}
