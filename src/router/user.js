const express=require('express')
const userRouter=express.Router()
const{userAuth}=require('../middleware/auth')
const ConnectionRequest=require('../models/connectionRequest')
const User=require('../models/user')
const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills"
userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user
        const connectionRequests=await ConnectionRequest.find({
        status:"interested",
        toUserId:loggedInUser._id
        }).populate("fromUserId",USER_SAFE_DATA)

        res.json({
            message:'connection request fetched',
            data:connectionRequests
        })


    }catch(e){

        res.status(400).send('error '+e.message)
    }
})

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const connections=await ConnectionRequest.find({
            $or:[
            {toUserId:loggedInUser._id,  status:"accepted"},
            {fromUserId:loggedInUser._id,  status:"accepted"}
            ]
      
        }).populate("fromUserId",USER_SAFE_DATA)
        const data=connections.map((row)=>{
            if(row.fromUserId._id.toString()===row.toUserId._id.toString())
                return row.toUserId

            return row.fromUserId
        })

        res.json({
            message:'connections fetch successful',
            data 
        })
    }catch(e){
        res.status(400).send('error '+e.message)
    }
})

userRouter.get('/feed',userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user
        const page=parseInt(req.query.page)||1
        let limit=parseInt(req.query.limit)||10
        limit=limit>50?50:limit
        const skip=(page-1)*limit

        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {
                    fromUserId:loggedInUser._id
                },{
                    toUserId:loggedInUser._id
                }
            ]
        }).select("fromUserId  toUserId")
        const hideUsersFromFeed= new Set()
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id }}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.send(users)
    }catch(e){
        res.status(400).send('error '+e.message)
    }
})













module.exports={userRouter}