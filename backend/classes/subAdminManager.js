const SubAdmin = require('../models/SubAdmin');

class SubAdminManager {
    static async checkSubAdminDevice(macId) {
        try {
            // Query the database to find a subadmin that has the specified macId in the devices array
            const subAdmin = await SubAdmin.findOne({ devices: macId });

            // If a subadmin is found, return success with the subadmin ID
            if (subAdmin) {
                return {
                    success: true,
                    id: subAdmin._id.toString() // Return the subadmin's ID
                };
            } else {
                // If no subadmin is found, return failure
                return {
                    success: false
                };
            }
        } catch (error) {
            console.error(error);
            return {
                success: false
            };
        }
    }
}

module.exports = SubAdminManager;
