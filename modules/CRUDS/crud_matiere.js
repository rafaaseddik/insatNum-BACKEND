const express = require('express');
const router = express.Router();
const md5 = require('md5');

var Class = require('../../models/matiere').model;



router.post('/create',(req,res)=>{
    let new_matiere = new Class(req.body.matiere);
    new_matiere.save().then(result=>res.json({
        status:1,
        data:{
            matiere:result
        }
    })).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));


});

router.post('/update',(req,res)=>{
    let matiere = req.body.matiere;
    Class.findByIdAndUpdate(matiere._id,matiere,{new:true},(err,result)=>{
        if(err){
            handle_error(err,res);
        }
        else{
            res.json({
                status:1,
                data:{
                    matiere:result
                }
            });
        }
    })

})
router.get('/delete',(req,res)=>{
    let id = req.query.id;
    Class.remove({_id:id}).then(result=>res.json({
        status:1,
        data:{
            text:"Matiere supprimé"
        }
    })).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));
})
router.get('/getMatiereByID',(req,res)=>{
    let id = req.query.id;

    Class.findById(id)
        .then(result=>res.json({
            status:1,
            data:{
                matiere:result
            }
        })).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));

})
router.get('/getAllMatieres',(req,res)=>{
    let page = Number(req.query.page-1);
    let limit = Number(req.query.limit);
    Class.find().limit(limit).skip(page*limit)
        .then(result=>res.json({
            status:1,
            data:{
                matieres:result
            }
        })).catch(err=>res.json({
        status:0,
        error:{
            message:err
        }
    }));

})


module.exports = router;