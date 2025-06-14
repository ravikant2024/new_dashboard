const BulkEnquiry = require('../models/BulkEnquiry');
const nodemailer = require("nodemailer");

const create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      company,
      address,
      gst
    } = req.body;

    // Create and save the enquiry to MongoDB
    const newBulkEnquiry = new BulkEnquiry({
      firstName,
      lastName,
      email,
      phone,
      message,
      company,
      address,
      gst
    });

    await newBulkEnquiry.save();

    // Configure transporter for SMTP
    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      host: 'mail.orginv8.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,       // info@orginv8.com
        pass: process.env.PASSWORD,    // Original%@2024
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const mailOptions = {
      from: `"Website Enquiry" <${process.env.EMAIL}>`,   // info@orginv8.com
      to: process.env.EMAIL_RECEIVER,                     // sales@orginv8.com
      subject: 'Bulk Inquiry',
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333;">
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${gst ? `<p><strong>GST Number:</strong> ${gst}</p>` : ''}
      ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    </div>
  `,
    };


    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'Bulk Enquiry form submitted, saved, and email sent.',
      data: newBulkEnquiry,
    });

  } catch (error) {
    console.error('Error saving contact form or sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error. Please try again later.',
    });
  }
};
const getAll = async (req, res) => {
  try {
    const bulkEnquiries = await BulkEnquiry.find().sort({ createdAt: -1 });
    console.log("bulkEnquiries---", bulkEnquiries)
    res.status(200).json({
      success: true,
      data: bulkEnquiries,
    });
  } catch (error) {
    console.error('Error fetching  bulk enquiry data:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { create, getAll };

