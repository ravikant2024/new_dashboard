const NatsManager = require('../../classes/natsConnectionManager');



exports.ping = async (req, res) => {
    try {
        const { macId } = req.body;
        if (!macId) {
            return res.status(400).json({ message: "MAC ID is required." });
        }


        console.log(`Received MAC ID: ${macId}`);
        let natsResponse = await NatsManager.request(macId, JSON.stringify({
            "deviceMessage": {
            "command": "ping",
            "data": ""
        }
        }))
        console.log("nats response is ", natsResponse)
        let parsedMessage = JSON.parse(natsResponse);
        if (parsedMessage.status == 'success') {
            return res.status(200).json({
                message: 1
            });
        }
        else {
            return res.status(200).json({
                message:0,
                data: parsedMessage,
            });
        }
    } catch (error) {
        console.error('Error in updating selected capabilities:', error);
        return res.status(200).json({
            message:0,
            error: error.message,
        });
    }
};
