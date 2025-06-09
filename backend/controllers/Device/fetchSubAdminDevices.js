// controllers/Device/fetchDevicesBySubAdminId.js
const DeviceManager = require('../../classes/deviceManager');
const Devicenosql = require('../../models/Devicenosql');
const SubAdmin = require('../../models/SubAdmin');
const mongoose = require('mongoose');
exports.fetchDevicesBySubAdminId = async (req, res) => {
    const { subAdminId } = req.body;
    try {
        let devices = await DeviceManager.getDevicesBySubAdminId(subAdminId); // Fetch devices
        return res.status(200).json({
            statusCode: 200,
            devices: devices, // Return the fetched devices
        });
    } catch (error) {
        console.error('Error fetching devices by subAdminId:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching devices',
            error: error.message,
        });
    }
};
exports.fetchSubadminDevices = async (req, res) => {
    const { subAdminId } = req.body;
    try {
        if (!subAdminId) {
            return res.status(400).json({
                message: "SubAdmin ID is required.",
            });
        }
        const subadminData = await SubAdmin.findById(subAdminId);
        const devices = await Devicenosql.find({ subAdminId: subAdminId });

        if (devices.length === 0) {
            return res.status(404).json({
                message: "No devices found for the given SubAdmin ID.",
            });
        }
        let filteredData = []
        // Iterate over each device
        for (let i = 0; i < devices.length; i++) {
            filteredData[i] = {
                macId: devices[i].macId,
                deviceModelno: devices[i].deviceModelno,
                updatedAt: devices[i].updatedAt
            }
        }

        return res.status(200).json({
            message: "Devices fetched successfully.",
            devices: filteredData,
            previousSearches: subadminData.previousSearches
        });

    } catch (error) {
        console.error('Error fetching devices by subAdminId:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching devices',
            error: error.message,
        });
    }
};
exports.addSearchMacId = async (req, res) => {
    try {
        const { macId, subAdminId } = req.body;

        // if (!macId || !subAdminId) {
        //     return res.status(400).json({
        //         statusCode: 400,
        //         message: 'macId and subAdminId are required',
        //     });
        // }
        let id = new mongoose.Types.ObjectId(subAdminId);
        const subAdmin = await SubAdmin.findById(id);

        if (!subAdmin) {
            return res.status(404).json({
                statusCode: 404,
                message: 'SubAdmin not found',
            });
        }

        const updatedSearches = subAdmin.previousSearches || [];

        if (!updatedSearches.includes(macId)) {
            updatedSearches.push(macId);


            if (updatedSearches.length > 10) {
                updatedSearches.shift();
            }

            subAdmin.previousSearches = updatedSearches;
            await subAdmin.save();
        }

        return res.status(200).json({
            statusCode: 200,
            message: 'Search macId added successfully',
            previousSearches: subAdmin.previousSearches,
        });
    } catch (error) {
        console.error('Error adding searched mac', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error adding searched mac',
            error: error.message,
        });
    }
};

// exports.fetchSubadminDevices = async (req, res) => {
//     const { subAdminId } = req.body;
//     try {
//         if (!subAdminId) {
//             return res.status(400).json({
//                 message: "SubAdmin ID is required.",
//             });
//         }

//         const devices = await Devicenosql.find({ subAdminId: subAdminId });

//         if (devices.length === 0) {
//             return res.status(404).json({
//                 message: "No devices found for the given SubAdmin ID.",
//             });
//         }

//         // Iterate over each device
//         for (let i = 0; i < devices.length; i++) {
//             let keys = [];
//             let sc = devices[i].selectedCapabilities;

//             // Extract keys from selectedCapabilities updates
//             for (let j = 0; j < sc.length; j++) {
//                 let update = sc[j].update;
//                 for (let k in update) {
//                     keys.push(k);
//                 }
//             }

//             // Remove duplicates using Set
//             let setKeys = new Set(keys);

//             // Make sure the device object is updated correctly
//             devices[i] = {
//                 ...devices[i].toObject(), // Ensure a plain object (in case of mongoose doc)
//                 setKeys: [...setKeys], // Set keys to the device object
//             };
//         }

//         return res.status(200).json({
//             message: "Devices fetched successfully.",
//             devices: devices,
//         });

//     } catch (error) {
//         console.error('Error fetching devices by subAdminId:', error);
//         return res.status(500).json({
//             statusCode: 500,
//             message: 'Error fetching devices',
//             error: error.message,
//         });
//     }
// };


exports.fetchDeviceById = async (req, res) => {
    try {
        const macId = req.query.id;
        console.log("--------->> mac id is ", macId);
        let data = await Devicenosql.findOne({ macId: macId });
        console.log("data of device is ", data);
        if (data) {
            res.status(200).json({
                "deviceName": data.deviceModelno,
                "documentId": "1137731938006130",

            });
        } else {
            res.status(404).json({
                message: "no device found for provided macId"
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching devices',
            error: e.message,
        });
    }
}

exports.fetchDeviceByMacId = async (req, res) => {
    try {
        const macId = req.query.id;
        console.log("--------->> mac id is ", macId);
        let data = await Devicenosql.findOne({ macId: macId });
        // console.log("data of device is ", data);

        devices = [data];
        for (let i = 0; i < devices.length; i++) {
            let keys = [];
            let sc = devices[i].selectedCapabilities;

            // Extract keys from selectedCapabilities updates
            for (let j = 0; j < sc.length; j++) {
                let update = sc[j].update;
                for (let k in update) {
                    keys.push(k);
                }
            }

            // Remove duplicates using Set
            let setKeys = new Set(keys);

            // Make sure the device object is updated correctly
            devices[i] = {
                ...devices[i].toObject(),
                setKeys: [...setKeys],
            };
        }
        if (data) {
            res.status(200).json(devices);
        } else {
            res.status(404).json({
                message: "no device found for provided macId"
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching devices',
            error: e.message,
        });
    }
}