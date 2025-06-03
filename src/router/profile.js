const express=require('express')
const User=require('../models/user')
const profileRouter=express.Router()
const {validateEditMethods}=require('../utils/validation')
const {userAuth}=require('../middleware/auth')

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
     const user=req.user
    res.send(user)
 }
 catch(e)
 {
     res.send('token not found')
 }
 }
 )

 profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
    if(!validateEditMethods(req.body))
    {
        throw new Error('edit not allowed')
    }
        const user=req.user
       Object.keys(req.body).forEach((key)=>user[key]=req.body[key])
       await user.save()
        res.json({"message":`${user.firstName} your data is successfully updated`,data:user})

    }
    catch(e){
        res.status(400).send('nhi hua update '+e.message)
    }
})

 profileRouter.get('/user',async(req,res)=>{
 
     try{
         const users=await User.find({emailId:req.body.emailId})
         if(users.length==0){
             res.status(404).send('user not fnd')
         }
         res.send(users)
     }
     catch(e){
         res.status(400).send('error in fetching user',e.message)
     }
 })

//  profileRouter.get('/feed',async(req,res)=>{
 
//      try{
//          const users=await User.find({})
//          if(users.length==0){
//              res.status(404).send('user not fnd')
//          }
//          res.send(users)
//      }
//      catch(e){
//          res.status(400).send('error in fetching user',e.message)
//      }
//  })
 
 profileRouter.delete('/user',async(req,res)=>{
     const id=req.body.id
     try{
         await User.findByIdAndDelete(id)
         res.send('user gyb')
     }
     catch(e){
         res.status(400).send('problem hai',e.message)
     }
 
 })




module.exports = {profileRouter};