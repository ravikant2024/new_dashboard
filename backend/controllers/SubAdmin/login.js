const SubAdmin = require('../../models/SubAdmin');
const bcrypt = require('bcryptjs');
const { sanitizeSubAdmin } = require("../../utils/SanitizeUser");
const { generateToken } = require("../../utils/GenerateToken");

exports.login = async (req, res) => {
    try {
        // Checking if user exists or not
        const existingUser = await SubAdmin.findOne({ email: req.body.email });
        existingUser.devices = [];
        console.log("subadmin data is ", existingUser);

        // If exists and password matches the hash
        if (existingUser && (await bcrypt.compare(req.body.password, existingUser.password))) {
            // Getting secure user info
            const secureInfo = sanitizeSubAdmin(existingUser);

            // Generating JWT token
            const token = generateToken(secureInfo);

            // Sending JWT token in the response cookies
            res.cookie('token', token, {
                sameSite: process.env.PRODUCTION === 'true' ? "None" : 'Lax',
                maxAge: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly: true,
                secure: process.env.PRODUCTION === 'true' ? true : false
            });

            // Send token and sanitized user info as JSON response
            return res.status(200).json({ token, user: sanitizeSubAdmin(existingUser) });
        }

        res.clearCookie('token');
        return res.status(404).json({ message: "Invalid Credentials" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some error occurred while logging in, please try again later' });
    }
}
