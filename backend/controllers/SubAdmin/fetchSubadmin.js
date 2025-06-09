const SubAdmin=require('../../models/SubAdmin')
const User=require('../../models/User');
const bcrypt=require('bcryptjs');
const { sanitizeUser, sanitizeSubAdmin } = require("../../utils/SanitizeUser");
const { generateToken } = require("../../utils/GenerateToken");
exports.fetchSubadmin = async (req, res) => {
    try {
        const subadminData = await SubAdmin.find({});
        console.log("subadmin data ",subadminData);
        res.status(201).json({
            subadminData:subadminData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during signup, please try again later" });
    }
}
