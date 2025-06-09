const Message = require("../models/Message");

// Get messages by orderId
exports.getMessagesByOrderId = async (req, res) => {
    try {
        const { orderId } = req.body;
        const messages = await Message.find({ orderId:orderId });

        // if (!messages.length) {
        //     res.status(200).json([]);
        // }

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching messages" });
    }
};

exports.addMessage = async (req, res) => {
    try {
        const { orderId, messageType,isOps,messageData } = req.body;

        // Validate input data
        if (!orderId  || !messageType || !messageData) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new message object
        const newMessage = new Message({
            _id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, // Generate unique message ID
            orderId,
            isOps,
            messageType,
            messageData
        });

        // Save to database
        await newMessage.save();
        res.status(201).json(newMessage); // Respond with the saved message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding message" });
    }
};