const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const user=require('../models/index');


exports.signup=function(req,res,next){
    var newUser=new user({
        _id:new mongoose.Types.ObjectId(),
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
    });
    newUser.save().then((result)=>{
        console.log(result)
        res.status(201).json({
            message: "User created"
          });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.login=function(req,res){
    user.findOne({
        email:req.body.email
    },function(err,user){
        if(err) throw err;
        if(!user || !user.comparePassword(req.body.password)){
            return res.status(401).json({message:'Authentication failed :| '});
        }
        return res.json({token:jwt.sign({email:user.email,_id:user.id},process.env.JWT_KEY)});
    });
}