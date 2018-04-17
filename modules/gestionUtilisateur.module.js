const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Utilisateur = require('../models/utilisateur').model;

router.get('/all',(req,res)=>{
    let page = Number(req.query.page-1);
    let limit = Number(req.query.limit);
    Utilisateur.find().limit(limit).skip(page*limit).then(result=>{
        res.json(result);
    }).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));

});
router.get('/getUserByID',(req,res)=>{
    let id = req.query.userID;
    Utilisateur.findById(id).then(result=>{
        res.json({
        status:1,
        data:{
            user:result
        }
    });
    }).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));

});
router.get('/searchUser',(req,res)=>{
    let query = req.query.query;
    var regExp = new RegExp('^'+query);
    console.log(regExp);
    Utilisateur.find({
        $or:[
            {nom:{$regex:regExp,$options:'i'}},
            {prenom:{$regex:regExp,$options:'i'}}
        ]
    }).then(result=>{
        res.json({
        status:1,
        data:{
            user:result
        }
    });
    }).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));

});
router.post('/login2',(req,res)=>{
    res.json(req.body);
    req.end();
    let email = req.body.email;
    let mot_de_passe = md5(req.body.mot_de_passe?req.body.mot_de_passe:"");

    Utilisateur.find({email:email,mot_de_passe:mot_de_passe}).then(result=>{
        if(result.length>0){
            res.json({
                status:1,
                data:{user:result[0]}
            })
        }
        else{
            res.json({
                status:2,
                error:{message:"email and password don't match"}
            })
        }
    }).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));
    console.log(email,mot_de_passe)

});
router.post('/login',(req,res)=>{

    let email = req.body.email;
    let mot_de_passe = md5(req.body.mot_de_passe?req.body.mot_de_passe:"");

    Utilisateur.find({email:email,mot_de_passe:mot_de_passe}).then(result=>{
        if(result.length>0){
            res.json({
                status:1,
                data:{user:result[0]}
            })
        }
        else{
            res.json({
                status:2,
                error:{message:"email and password don't match"}
            })
        }
    }).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));
    console.log(email,mot_de_passe)

});
router.post('/subscribe',(req,res)=>{
    let new_user = req.body.user;
    Utilisateur.findUserByEmail(new_user.email,function(err,result){
        if(err){
            handle_error(err,res);
        }
        if(result.length==0){
            var user = Utilisateur(new_user);
            user.save().then(result=>res.json({
                status:1,
                data:{
                    user:result
                }
            })).catch(err=>res.json({
                status:0,
                error:{
                    message:err
                }
            }));
        }
        else{
            res.json({
                status:2,
                error:{
                    message:"Un utilisateur avec le même email existe deja"
                }
            })
        }
    })

/*
    res.json({
        status:0,
        error:{
            message:'not implemented yet'
        }
    });*/
});
router.post('/update',(req,res)=>{
    let user = req.body.user;
    Utilisateur.findByIdAndUpdate(user._id,user,{new:true},(err,result)=>{
        if(err){
            handle_error(err,res);
        }
        else{
            res.json({
                status:1,
                data:{
                    user:result
                }
            });
        }
    })

})
router.get('/delete',(req,res)=>{
    let id = req.query.id;
    Utilisateur.remove({_id:id}).then(result=>res.json({
        status:1,
        data:{
            text:"Utilisateur supprimé"
        }
    })).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));
})
var handle_error = function(error,res){
    res.statusCode=500
    res.json({
        status:0,
        error:error
    })
}
module.exports = router;