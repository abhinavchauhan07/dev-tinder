const express=require('express')
const requestRouter=express.Router()
const{userAuth}=require('../middleware/auth')
const ConnectionRequest=require('../models/connectionRequest')
const User=require('../models/user')


requestRouter.post("/request/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id
        const toUserId=req.params.toUserId
        const status=req.params.status
        const allowedStatus=['ignored','interested']

        if(!allowedStatus.includes(status))
        {
           return res.status(400).send('invalid status type')
        }

        const findDuplicateReq=await ConnectionRequest.findOne(
            {
                $or:[
                    { fromUserId,toUserId},
                   { fromUserId:toUserId,toUserId:fromUserId}
                ]
               })
        if(findDuplicateReq)
        {
            throw new Error('connection request already exits')
        }

        const isUserExits=await User.findById(toUserId)
        if(!isUserExits)
        {
            throw new Error('user does not exists')
        }
       

        const connectionRequest= new ConnectionRequest({
           fromUserId,
           toUserId,
           status 
        })
        const data= await connectionRequest.save()
        res.json({
            message:'connection request sent successully',
            data
        })

    }catch (e){
        res.status(400).send('error '+e.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{

    try{
        const loggedInUser=req.user
        const {status,requestId}=req.params
        const allowedStatus=['accepted','rejected']
        if(!allowedStatus.includes(status)){
            throw new Error('invalid status type')
        }

       const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:'interested'
       })

       if(!connectionRequest){
        return res.status(404).json({
            message:'connection request not found'
        })
       }


       connectionRequest.status=status
       const data=await connectionRequest.save()

       res.json({
        message:"connection request "+status,
        data
       })

        
    }catch(e){
        res.send('error '+e.message)
    }
})
module.exports={requestRouter}