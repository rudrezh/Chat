const Conversation = require("../models/conversationmodel");
const Message = require("../models/messagemodels");
const { getReceiverSocketId , io} = require("../socket/socket");

const sendMessage = async (req,res) => {
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all:[senderId,receiverId]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //await conversation.save()
        //await newmessage.save()
        await Promise.all([conversation.save(),newMessage.save()]);

        //socket function
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //to send message to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    }
    catch(error){
        console.log("error in send message controller : ",error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

const getMessage = async (req,res) => {
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : { $all : [senderId,userToChatId] },
        }).populate("messages"); //get actual messages 

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    }
    catch(error){
        console.log("error in get message controller : ",error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

module.exports = {sendMessage,getMessage};