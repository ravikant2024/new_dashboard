const Chat = require("../models/Chat")

exports.getActiveChats = async (req, res) => {
    try {
        const result = await Chat.find({ activeFlag: true });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching chats" })
    }
}

exports.getChatById = async (req, res) => {
    try {
        const { chatId } = req.body;
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.status(200).json(chat);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error adding chats",
        })
    }
}

exports.createChat = async (req, res) => {
    try {
        const { customerId, orderDetails, orderId, customerData } = req.body;

        const existingChat = await Chat.findOne({ _id: orderId });

        if (existingChat) {
            return res.status(200).json({ message: "Chat with this orderId already exists" });
        }

        const newChat = new Chat({
            _id: orderId,
            customerId: customerId,
            orderDetails: orderDetails,
            customerData: customerData,
            activeFlag: true
        });

        await newChat.save();
        return res.status(200).json(newChat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating chat" });
    }
};

exports.updateActiveFlag = async (req, res) => {
    try {
        const { activeFlag, chatId } = req.body; // Get the new activeFlag value from the request body
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Update the activeFlag field
        chat.activeFlag = activeFlag;
        await chat.save();  // Save the updated chat

        res.status(200).json({ message: `Chat status updated to ${activeFlag ? 'active' : 'inactive'}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating active status" });
    }
};
