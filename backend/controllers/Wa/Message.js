const ChatManager = require("../../classes/chatManager");

exports.processMessage = async (req, res) => {
    try {
        const { phoneNumber, message } = req.body
        ChatManager.handleMessage(phoneNumber, message);
        return res.status(200).json({
            success: true,
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' })
    }
}