const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var AbsenceSchema = require('./absence').schema;

var NotificationSchema = new Schema({
    date:{type:Date,default:Date.now()},
    type:{type:String,enum:["ABSENCE","ELIMINATION"]},
    absence:{type:Schema.Types.ObjectId,ref:"Absence",autopopulate:true},
    utilisateur:{type:Schema.Types.ObjectId,ref:"Utilisateur",autopopulate:true}
});
NotificationSchema.plugin(autopopulate);

module.exports = {
    model:mongoose.model('Notification',NotificationSchema),
    schema : NotificationSchema
};