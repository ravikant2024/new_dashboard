const Ops = require('../../models/Ops')
const bcrypt = require('bcryptjs');
const { generateToken } = require("../../utils/GenerateToken");
const { sanitizeOps } = require("../../utils/SanitizeUser");
exports.signup = async (req, res) => {
    try {
        const existingUser = await Ops.findOne({ email: req.body.email });

        // If user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const createdUser = new Ops(req.body);
        await createdUser.save();

        console.log(createdUser)
        const secureInfo = sanitizeOps(createdUser);
        // Generating JWT token
        const token = generateToken(secureInfo);

        // Sending JWT token in the response cookies
        res.cookie('token', token, {
            sameSite: process.env.PRODUCTION === 'true' ? "None" : 'Lax',
            maxAge: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            secure: process.env.PRODUCTION === 'true' ? true : false
        });

        res.status(201).json(secureInfo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during signup, please try again later" });
    }
}
