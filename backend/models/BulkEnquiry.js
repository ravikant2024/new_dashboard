const mongoose = require('mongoose');

const bulkEnquirySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
   gst: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BulkEnquiry', bulkEnquirySchema);
