const express = require('express');
const router = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

router.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"]
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message:'invalid status type',status})
        }


         if(fromUserId.toString() === toUserId.toString()){
            return res
            .status(400)
            .json({message:"You cannot send a connection request to yourself"})
        }

        
        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res
            .status(400)
            .json({message:"user does not exist in db"})
        }

       

        const existigConnectionRequest = await ConnectionRequest.findOne({
           $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
           ]
        })

        if(existigConnectionRequest){
            return res
            .status(400)
            .json({message:"connection request already exist"})
        }


        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            message:
            req.user.firstName+ " is " + status + " in " +toUser.firstName,
            data,
        })


    } catch (err) {
        res.status(400).json({message:"ERROR "+err.message})
    }
})

module.exports = router;