// classes/deviceManager.js
const { getDeviceModel } = require('../models/Devices');
const SubAdminManager = require('./subAdminManager');
const axios = require('axios');
class DeviceManager {
    static async addDevice(macId, deviceModelno, availableCapabilities) {
        try {
            const Device = await getDeviceModel();
            let subAdminResponse = await SubAdminManager.checkSubAdminDevice(macId);

            if (subAdminResponse.success) {
                let subAdminId = subAdminResponse.id;
                await axios.post("http://103.142.118.35:4369/keyCreation", {
                    "macId": macId,
                    "token": "cebbc6a2-fdb2-42bf-8fa2-dd7b7ebe2ac8",
                    "userId": subAdminId
                });
                const newDevice = await Device.create({
                    macId,
                    deviceModelno,
                    subAdminId,
                    availableCapabilities, // Include available capabilities
                    selectedCapabilities: availableCapabilities
                });

                return {
                    statusCode: 200,
                    message: "Device added successfully",
                    device: newDevice
                };
            } else {
                return {
                    statusCode: 203,
                    message: "Unable to find linked subadmin"
                };
            }
        } catch (e) {
            console.log(e.message);
            if (e.message == 'Validation error') {
                return {
                    statusCode: 204,
                    message: "already registred"
                };
            } else {
                return {
                    statusCode: 203,
                    message: "bad request"
                };
            }
        }
    }
    static async getDevicesBySubAdminId(subAdminId) {
        try {
            const Device = await getDeviceModel();
            console.log(subAdminId);
            // Use Sequelize's findAll method to get devices by subAdminId
            const devices = await Device.findAll({ where: { subAdminId } });
            return devices; // Return devices
        } catch (error) {
            throw new Error('Error fetching devices: ' + error.message);
        }
    }
}

module.exports = DeviceManager; // Ensure this line exports DeviceManager
