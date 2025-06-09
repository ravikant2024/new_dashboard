// controllers/Device/updateDevice.js
const NatsManager = require('../../classes/natsConnectionManager');
const Device = require('../../models/Devices');
const axios=require('axios');
exports.reconfigureCapabilitites = async (req, res) => {
    const { macId, message } = req.body;
    try {
        
        let natsResponse=await NatsManager.request(macId,JSON.stringify(message))
        console.log("nats response is ",natsResponse)
        let parsedMessage=JSON.parse(natsResponse);
        if (parsedMessage.status == 'success') {
            return res.status(200).json({
                message: "capabilities updates",
            });
        }
        else {
            return res.status(490).json({
                message: "device haven't responded",
                data: parsedMessage,
            });
        }
   
    } catch (error) {
        console.error('Error updating device capabilities:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error updating device capabilities',
            error: error.message,
        });
    }
};
