const Contact = require('../models/ContactUs');

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const newContact = new Contact({ firstName, lastName, email, phone, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted and saved to database.',
      data: newContact,
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {create};
