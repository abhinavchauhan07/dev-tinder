const express=require('express')
const userRouter=express.Router()
const{userAuth}=require('../middleware/auth')
const ConnectionRequest=require('../models/connectionRequest')


userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user
        const connectionRequests=await ConnectionRequest.find({
        status:"interested",
        toUserId:loggedInUser._id
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"])

        res.json({
            message:'connection request fetched',
            data:connectionRequests
        })


    }catch(e){

        res.status(400).send('error '+e.message)
    }
})














module.exports={userRouter}