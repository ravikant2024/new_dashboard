// controllers/Device/updateDevice.js
const { getDeviceModel } = require('../../models/Devices');
const Devicenosql = require('../../models/Devicenosql');
const { version } = require('mongoose');
const NatsManager = require('../../classes/natsConnectionManager');
exports.updateCapabilities = async (req, res) => {
    const Device = await getDeviceModel();
    const { macId, selectedCapabilities } = req.body;
    try {
        console.log('macId:', macId);
        console.log('selectedCapabilities:', selectedCapabilities);

        const device = await Device.findByPk(macId);
        if (!device) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Device not found',
            });
        }
        device.selectedCapabilities = selectedCapabilities;
        await device.save();

        return res.status(200).json({
            message: 'Device capabilities updated successfully!',
            device: device.toJSON(),
        });
    } catch (error) {
        console.error('Error updating device capabilities:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error updating device capabilities',
            error: error.message,
        });
    }
};

exports.updateSelectedCapabilities = async (req, res) => {
    try {
        const { macId } = req.body;
        const { selectedCapabilities, verison } = req.body;

        // Validate that macId and selectedCapabilities are provided
        if (!macId) {
            return res.status(400).json({ message: "MAC ID is required." });
        }

        if (!selectedCapabilities || typeof selectedCapabilities !== 'object') {
            return res.status(400).json({ message: "Valid selectedCapabilities object is required." });
        }

        console.log(`Received MAC ID: ${macId}`);
        console.log(`Received selectedCapabilities: ${JSON.stringify(selectedCapabilities)}`);

        // Check if the device exists in the database
        let device = await Devicenosql.findOne({ macId: macId });

        if (!device) {
            return res.status(404).json({
                message: "Device not found in the database.",
            });
        }

        // Update the selectedCapabilities field in the device
        device.selectedCapabilities = selectedCapabilities;
        device.version = version;
        // Save the updated device document
        await device.save();
        console.log("Device updated successfully:", device);

        // Respond with the updated device information
        return res.status(200).json({
            message: "Selected capabilities updated successfully.",
            device: device,
        });

    } catch (error) {
        console.error('Error in updating selected capabilities:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};


exports.updateLimits = async (req, res) => {
    try {
        const { macId, limits } = req.body;

        // Validate that macId and selectedCapabilities are provided
        if (!macId) {
            return res.status(400).json({ message: "MAC ID is required." });
        }


        console.log(`Received MAC ID: ${macId}`);
        let natsResponse = await NatsManager.request(macId, JSON.stringify({
            "deviceMessage": {
            "command": "limit",
            "data": limits
        }
        }))
        console.log("nats response is ", natsResponse)
        let parsedMessage = JSON.parse(natsResponse);
        if (parsedMessage.status == 'success') {
            // Check if the device exists in the database
            let device = await Devicenosql.findOne({ macId: macId });

            if (!device) {
                return res.status(404).json({
                    message: "Device not found in the database.",
                });
            }

            // Update the selectedCapabilities field in the device
            device.limits = limits;
            // Save the updated device document
            await device.save();
            console.log("Device updated successfully:", device);

            // Respond with the updated device information
            return res.status(200).json({
                message: "Selected capabilities updated successfully.",
                device: device,
            });
        }
        else {
            return res.status(490).json({
                message: "device haven't responded",
                data: parsedMessage,
            });
        }
    } catch (error) {
        console.error('Error in updating selected capabilities:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};


exports.restart = async (req, res) => {
    try {
        const { macId } = req.body;

        // Validate that macId and selectedCapabilities are provided
        if (!macId) {
            return res.status(400).json({ message: "MAC ID is required." });
        }


        console.log(`Received MAC ID: ${macId}`);
        let natsResponse = await NatsManager.request(macId, JSON.stringify({
            "deviceMessage": {
            "command": "restart",
            "data": ""
        }
        }))
        console.log("nats response is ", natsResponse)
        let parsedMessage = JSON.parse(natsResponse);
        if (parsedMessage.status == 'success') {
           
            return res.status(200).json({
                message: "restart done",
                success:true
            });
        }
        else {
            return res.status(490).json({
                succes:false,
                message: "device haven't responded",
                data: parsedMessage,
            });
        }
    } catch (error) {
        console.error('Error in updating selected capabilities:', error);
        return res.status(200).json({
            success:false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
