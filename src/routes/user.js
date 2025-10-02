const express = require('express');
const router = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const {userAuth} = require('../middlewares/auth');
const { set } = require('mongoose');
const User = require('../models/user');

const USER_SAFE_DATA = ['firstName','lastName','age','photoUrl','about','skills'];

router.get('/user/requests/received',userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status : 'interested'
    }).populate('fromUserId',USER_SAFE_DATA)
   

    res.json({
        message:"Data Fetched  succesfully",
        data:connectionRequest
    })

    } catch (error) {
       res.status(400).json({message:"ERROR: "+error.message}) 
    }
})

router.get('/user/connections',userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:'accepted'}
            ]
        }).populate('fromUserId',USER_SAFE_DATA).populate('toUserId',USER_SAFE_DATA)

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.equals(loggedInUser._id)){
                return row.toUserId
            }
            return row.fromUserId
        })

        if(data.length === 0){
            return res
            .json({success:true,data:[],message:"no connection found"})
        }


        res.json({
            data:data
        })

    } catch (error) {
        res.status(400).json({message:'ERROR: '+error.message})
    }
})

router.get('/feed',userAuth,async(req,res)=>{
    try {
        const page = parseInt(req.query.page) ||1;
        let limit = parseInt(req.query.limit)|| 10;
        limit = limit > 50 ? 50 : limit;
        limit = limit < 1 ? 10 : limit; 
        const skip = (page - 1) * limit;

        const loggedInUser = req.user;
        const connnectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        })
        .select("fromUserId toUserId")
       
        const hideUsersFromFeed = new Set()
        connnectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ],
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)

        res.json({
            data:users
        })
    } catch (error) {
        res.status(400).json({message:"ERROR "+error.message})
    }
})

module.exports = router;