const Contact = require('../models/ContactUs');
const nodemailer = require("nodemailer");
const create = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, company, address } = req.body;

    const newContact = new Contact({ firstName, lastName, email, phone, message, company, address });
    console.log("newContact",newContact)
    await newContact.save();
    const transporter = nodemailer.createTransport({
      host: 'mail.orginv8.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: `Product Inquiry `,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 0.6; color: #333;margin-top:12px">
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
      <p style="margin-bottom:9px"><strong>Phone:</strong> ${phone}</p>
      <p style="line-height:1.3"><strong>Message:</strong> ${message}</p>
    </div>
    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      message: 'Contact form submitted, saved, and email sent.',
      data: newContact,
    });
  } catch (error) {
    console.error('Error saving contact form or sending email:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { create, getAll };
