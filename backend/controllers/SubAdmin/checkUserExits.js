// controllers/SubAdmin.js or similar file
const CheckUser = require('../../models/CheckUserExists');  

exports.checkUserExists = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await CheckUser.findOne({ email });
        return res.json({ exists: !!user });
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
