const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Utilisateur = require('../models/utilisateur').model;
var Conversation = require('../models/conversation').model;


router.post('/send', (req, res) => {
    let payload = req.body.payload;
    var sens;
    var user1, user2;
    if (payload.utilisateur_1._id < payload.utilisateur_2._id) {
        user1 = payload.utilisateur_1;
        user2 = payload.utilisateur_2;
        sens = "DIRECT";
    }
    else {
        user2 = payload.utilisateur_1;
        user1 = payload.utilisateur_2;
        sens = "INDIRECT";
    }
    Conversation.findOne(
        {utilisateur_1: user1._id, utilisateur_2: user2._id}
    ).then(result => {
        if (result == null) {
            var conversation = Conversation({
                utilisateur_1: user1._id,
                utilisateur_2: user2._id,
                messages: [{
                    sens: sens,
                    content: payload.content
                }],
                last_message: {
                    sens: sens,
                    content: payload.content
                }
            })
            conversation.save().then(result => res.json(result)).catch(err => handle_error(err, res))
        }
        else {
            Conversation.findOneAndUpdate({_id: result._id},
                {
                    $push: {
                        messages: {
                            sens: sens,
                            content: payload.content
                        }
                    },
                    date_dernier_mise_a_jour: Date.now(),
                    last_message: {
                        sens: sens,
                        content: payload.content
                    }

                },
                {
                    new: true
                },
                (err2, result2) => {
                    if (err2) {
                        handle_error(err2, res);
                    }
                    else {
                        res.json({
                            status: 1,
                            data: {
                                conversation: result2
                            }
                        });
                    }
                })

        }
    }).catch(error => {
        handle_error(error, res);
    })

});
router.get('/getConversationByUser', (req, res) => {
    let userId = req.query.userID;
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Conversation.find({
        $or: [
            {utilisateur_1: userId},
            {utilisateur_2: userId}

        ]
    }).sort({date_dernier_mise_a_jour: -1, 'messages.date': -1}).select(
        {
            _id: true,
            date_debut: true,
            utilisateur_1: true,
            utilisateur_2: true,
            last_message: true,
            date_dernier_mise_a_jour: true
        }).limit(limit).skip(page * limit).populate('utilisateur_1').populate('utilisateur_2')
        .then(result => res.json({
            status: 1,
            data: {
                conversations: result
            }
        })).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getConversationByUsers', (req, res) => {
    let user_1_ID = req.query.user_1_ID;
    let user_2_ID = req.query.user_2_ID;
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Conversation.find({
        $or: [
            {utilisateur_1: user_1_ID, utilisateur_2: user_2_ID},
            {utilisateur_1: user_2_ID, utilisateur_2: user_1_ID}
        ]
    }).populate('utilisateur_1').populate('utilisateur_2')
        .then(result => {
            if(result.length==0){
                res.json({
                    status:1,
                    data:{
                        conversation:{
                            messgages:[]
                        }
                    }
                })
            }
            else{
                res.json({
                    status: 1,
                    data: {
                        conversation: result
                    }
                })
            }

        }).catch(err => res.json({
        status: 0,
        error: {
            message: err
        }
    }));

})
router.get('/getMessagesByConversationID', (req, res) => {
    let conversationID = req.query.conversationID;
    let page = Number(req.query.page - 1);
    let limit = Number(req.query.limit);
    Conversation.findById(conversationID).populate('utilisateur_1').populate('utilisateur_2').then(result => {
        if (result != null) {
            result.messages.sort(function (message_1, message_2) {
                var a = (new Date(message_2.date)).getTime() - (new Date(message_1.date)).getTime();
                console.log(a)
                return a;
            })
            if (limit > 0)
                result.messages = result.messages.splice(page * limit, limit);
        }
        res.json({
            status: 1,
            data: {
                conversation: result
            }
        })
    })
})

module.exports = router;