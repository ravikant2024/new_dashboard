const DeviceManager = require('../../classes/deviceManager');
const DeviceManagerMongo = require('../../classes/deviceManagermongo');
const SubAdminManager = require('../../classes/subAdminManager');
const Devicenosql = require('../../models/Devicenosql');
const Sale = require('../../models/Sale');
const axios = require('axios');


exports.addDevice = async (req, res) => {
    try {
        const { macId, deviceModelno, availableCapabilities } = req.body;
        let response = await DeviceManager.addDevice(macId, deviceModelno, availableCapabilities);

        return res.status(response.statusCode).json({
            message: response.message,
            device: response.device,
        });

    } catch (error) {
        console.error('Error adding device:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error adding device',
            error: error.message,
        });
    }
};
exports.registration = async (req, res) => {
    try {
        const { macId } = req.query;

        // Validate that macId is provided
        if (!macId) {
            return res.status(400).json({ message: "MAC ID is required." });
        }
        console.log(`Received MAC ID: ${macId}`);

        // Check if the MAC ID is linked to a SubAdmin
        const subAdminResponse = await SubAdminManager.checkSubAdminDevice(macId);
        if (!subAdminResponse.success) {
            return res.status(203).json({
                message: "Unable to find linked subadmin.",
            });
        }
        const subAdminId = subAdminResponse.id;

        // Check if the device exists in the Devicenosql collection
        let existingDevice = await Devicenosql.findOne({ macId: macId });

        if (!existingDevice) {
            // Create a new device record if it doesn't exist
            existingDevice = new Devicenosql({ macId: macId, isKeyCreated: false,subAdminId:subAdminId,availableCapabilities:[] });
            await existingDevice.save();
            console.log("New device created:", existingDevice);
            const sale = await Sale.findOne({ "devices.macId": macId }, { "devices.$": 1 });
            if (!sale) {
                return res.status(404).json({
                    message: "Device not found in sales database.",
                });
            }
            console.log("sale data is ", sale);
            const { mfgDate, expireDate } = sale.devices[0]; // Extract mfgDate and expireDate
            console.log(`Fetched Dates - MFG: ${mfgDate}, Expire: ${expireDate}`);
            await axios.post("http://license_server:4369/keyCreation", {
                macId: macId,
                token: "cebbc6a2-fdb2-42bf-8fa2-dd7b7ebe2ac8",
                userId: subAdminId,
                mfgDate: mfgDate,
                expireDate: expireDate,
            });
        } else {
            console.log("Device already exists in the database.");
        }
        // Send a WhatsApp message for successful registration
        const whatsappNumber = '+15551604050';
        const message = `Hi, I have my activated my device. Please provide me support for this device ${macId}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        return res.redirect(whatsappUrl);
    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
