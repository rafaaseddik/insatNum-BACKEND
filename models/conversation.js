const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UtilisateurSchema = require('./utilisateur').schema;

var MessagesSchema = new Schema({
    sens:{type:String,enum:['DIRECT','INDIRECT']},
    date:{type:Date,default:Date.now()},
    content:String,
    isSeen:{type:Boolean,default:false}
},{
 timestamps: { createdAt: 'created_at' }
});
var ConversationSchema = new Schema({
    date_debut:{type:Date,default:Date.now()},
    date_dernier_mise_a_jour:{type:Date,default:Date.now()},
    utilisateur_1:{type:Schema.Types.ObjectId,ref:"Utilisateur"},
    utilisateur_2:{type:Schema.Types.ObjectId,ref:"Utilisateur"},
    messages:[MessagesSchema],
    last_message:MessagesSchema
});



//Statics
// UtilisateurSchema.statics.findUserByEmail = function(email,callback){
//     return this.find({email:email},callback);
// }
module.exports = {
    model:mongoose.model('conversation',ConversationSchema),
    schema:ConversationSchema
}
