const Ota = require('../../models/ota');

exports.addOta = async (req, res) => {
    try {
        const { deviceModelno, version, data } = req.body;
        const existingOta = await Ota.findOne({ deviceModel: deviceModelno });
        if (existingOta) {
            if (existingOta.version >= version) {
                return res.status(400).json({
                    statusCode: 400,
                    message: `A higher or equal version (${existingOta.version}) already exists for this device model.`,
                });
            }
            existingOta.version = version;
            existingOta.data = data;
            await existingOta.save();
            return res.status(200).json({
                statusCode: 200,
                message: 'Ota data updated successfully',
                device: existingOta,
            });
        } else {
            // Create new OTA record if it doesn't exist
            const newOta = await Ota.create({ deviceModel: deviceModelno, version, data });
            return res.status(200).json({
                statusCode: 200,
                message: 'Ota data added successfully',
                device: newOta,
            });
        }

    } catch (error) {
        console.error('Error adding device:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error adding device',
            error: error.message,
        });
    }
};

exports.fetchOtaIndex = async (req, res) => {
    try {
        const { deviceModelno, version } = req.body;

        const existingOta = await Ota.findOne({ deviceModel: deviceModelno });

        if (existingOta) {
            // Check if the requested version is in the current OTA version or a previous version
            if (existingOta.version < version) {
                return res.status(400).json({
                    statusCode: 400,
                    message: `A higher or equal version (${existingOta.version}) already exists for this device model.`,
                });
            } else {
                let versionFound = false;
                let dataLength = 0;

                // Check if the version exists in the previousVersions array
                if (existingOta.previousVersions.length > 0) {
                    for (const prevVersion of existingOta.previousVersions) {
                        if (prevVersion.version === version) {
                            versionFound = true;
                            dataLength = Object.keys(prevVersion.data).length;
                            break;
                        }
                    }
                }

                // If the version is not found in previousVersions, check the current version
                if (!versionFound) {
                    if (existingOta.version === version) {
                        dataLength = Object.keys(existingOta.data).length;
                    } else {
                        return res.status(404).json({
                            statusCode: 404,
                            message: `Version ${version} not found for this device model.`,
                        });
                    }
                }

                return res.status(200).json({
                    statusCode: 200,
                    indexLength: dataLength,
                    version: versionFound ? version : existingOta.version
                });
            }
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Device model not found',
            });
        }
    } catch (error) {
        console.error('Error fetching device:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching device',
            error: error.message,
        });
    }
};
exports.fetchOtaData = async (req, res) => {
    try {
        const { deviceModelno, version } = req.body;

        // Fetch the OTA data for the device model
        const existingOta = await Ota.findOne({ deviceModel: deviceModelno });

        if (existingOta) {
            // Check if the requested version is greater than the existing version
            if (existingOta.version < version) {
                return res.status(400).json({
                    statusCode: 400,
                    message: `A higher or equal version (${existingOta.version}) already exists for this device model.`,
                });
            }

            // If the requested version is older, check the previous versions array
            if (existingOta.version > version) {
                const previousVersionData = existingOta.previousVersions.find(v => v.version === version);

                if (previousVersionData) {

                    return res.status(200).json({
                        statusCode: 200,
                        data: previousVersionData.data
                    });

                } else {
                    return res.status(404).json({
                        statusCode: 404,
                        message: `Version ${version} not found in previous versions for this device model.`,
                    });
                }
            }

            // If the requested version matches the current version, return data from the current version

            return res.status(200).json({
                statusCode: 200,
                data: existingOta.data
            });

        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Device model not found',
            });
        }
    } catch (error) {
        console.error('Error fetching device:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching device',
            error: error.message,
        });
    }
};

exports.fetchOtaVersions = async (req, res) => {
    try {
        const { deviceModelno } = req.body;

        const existingOta = await Ota.findOne({ deviceModel: deviceModelno });

        if (!existingOta) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Device model not found',
            });
        }

        const versions = [{
            version: existingOta.version,
            data: existingOta.data
        }, ...existingOta.previousVersions];

        return res.status(200).json({
            statusCode: 200,
            versions,
        });
    } catch (error) {
        console.error('Error fetching device versions:', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error fetching device versions',
            error: error.message,
        });
    }
};
