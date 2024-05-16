import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            // Corrected typo in participants
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // Push the new message to the conversation and save
        conversation.messages.push(newMessage._id);
        // it will be saved one by one:
       // await conversation.save();
        //await newMessage.save();
// both will be saved simultaneously
        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        res.status(500).json({ error: "internal server issue" });
    }
}

export const getMessages = async (req, res) => {
   try{
const {id:userToChatId}= req.params;
const senderId = req.user._id;
const conversation= await Conversation.findOne({
    participants: {$all : [senderId,userToChatId] },

    // THIS POPULATE METHOD WILL PUT ACTUAL MESSAGE INSIDE CONVERSATION MESSAGES WHERE IT JUST CONTAIN ID :
}).populate("messages");


if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
   }
   catch(error){
    console.log("error in receiveMessage controller", error.message);
    res.status(500).json({ error: "internal server issue" });

   }
}
