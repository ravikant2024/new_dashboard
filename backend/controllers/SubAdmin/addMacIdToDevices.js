const SubAdmin = require('../../models/SubAdmin');

exports.addMacIdToDevices = async (req, res) => {
    try {
        const { email, macIds } = req.body;

        if (!email || !Array.isArray(macIds) || macIds.length === 0) {
            return res.status(400).json({ message: "Email and an array of MacIDs are required" });
        }

        // Use $addToSet to ensure only unique MacIDs are added to the array
        const subAdmin = await SubAdmin.findOneAndUpdate(
            { email },
            { $addToSet: { devices: { $each: macIds } } },
            { new: true } // Return the updated document
        );

        if (!subAdmin) {
            return res.status(404).json({ message: "SubAdmin not found" });
        }

        res.status(200).json({
            message: "MacIDs added successfully",
            devices: subAdmin.devices
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred, please try again later" });
    }
};
