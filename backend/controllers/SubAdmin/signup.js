const SubAdmin = require('../../models/SubAdmin');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { sendMail } = require("../../utils/Emails");
const {generateOTP}=require("../../utils/GenerateOtp");
const { sanitizeSubAdmin } = require("../../utils/SanitizeUser");
const { generateToken } = require("../../utils/GenerateToken");

exports.signup = async (req, res) => {
    try {
        const existingUser = await SubAdmin.findOne({ email: req.body.email });

        // If user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const companyName = "Original Innovation LLP"; // Define company name
        const portalURL = "https://orginv8.in/subadmin/login"; // Define portal URL

        let password=generateOTP();
        // Default initial password
        req.body.password = password

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Creating new user
        const createdUser = new SubAdmin(req.body);
        await createdUser.save();

        // Getting secure user info
        const secureInfo = sanitizeSubAdmin(createdUser);

        // Generating JWT token
        const token = generateToken(secureInfo);

        // Constructing email content
        const loginDetails = `
        <h2>Welcome to ${companyName}</h2>
        <p>Dear ${createdUser.name},</p>
        <p>We are excited to inform you that you have been registered as a Sub-Admin for monitoring the devices you purchased. You can now manage and monitor your devices on our portal.</p>
        <h3>Your Login Details:</h3>
        <ul>
            <li><b>Email:</b> ${createdUser.email}</li>
            <li><b>Initial Password:</b> ${password}</li>
            <li><b>Portal URL:</b> <a href="${portalURL}" target="_blank">${portalURL}</a></li>
        </ul>
        <h3>Devices Assigned:</h3>
        <ul>
            ${createdUser.devices.map((device) => `<li>${device}</li>`).join('')}
        </ul>
        <p>We recommend changing your password after your first login for security purposes.</p>
        <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:engineering@orginv8.com">engineering@orginv8.com</a>.</p>
        <p>Best Regards,<br>${companyName} Team</p>
        `;

        console.log(loginDetails);

        // Sending the email
        await sendMail(createdUser.email, 'Welcome to Original Innovation LLP', loginDetails);

        // Sending JWT token in the response cookies
        res.cookie('token', token, {
            sameSite: process.env.PRODUCTION === 'true' ? "None" : 'Lax',
            maxAge: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            secure: process.env.PRODUCTION === 'true' ? true : false
        });

        res.status(201).json(createdUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during signup, please try again later" });
    }
};
