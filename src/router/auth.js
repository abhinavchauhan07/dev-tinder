const User=require('../models/user')
const express=require('express')
const authRouter=express.Router()
const bcrypt=require('bcrypt')
const {validateSignupData}=require('../utils/validation')


authRouter.post('/signup',async(req,res)=>{
try{
    validateSignupData(req)
    const {password}=req.body
    const passwordHash=await bcrypt.hash(password,10)
    const user=new User({
       ...req.body,
        password:passwordHash,
    })   
    await user.save()
    res.send('user added into the database')
}
catch(err){
    res.status(400).send('error while adding user '+err.message)
}
})


authRouter.post('/login',async(req,res)=>{
    const{emailId,password}=req.body
try{
    
    if(!emailId ||!password){
        throw new Error('enter the credentials')
    }
    const validateUser=await User.findOne({emailId:emailId})
    if(!validateUser){
        throw new Error ('cred invalid')
    }
    const isPasswordValid=await validateUser.getValidatePassword(password)
    if(isPasswordValid)
    {
       const token=await validateUser.getJWT()
       console.log(token)
       res.cookie("token",token )
       res.send('successful')
    }
    else
   res.status(401).send('invalid cred')

}
catch(e){
    res.status(401).send("unauthorized "+e.message)
}
})

authRouter.post('/logout',async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now())
    })
    res.send('logout hogya')
})

module.exports = {authRouter};