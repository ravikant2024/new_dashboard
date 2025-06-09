const mongoose = require('mongoose');

const checkUserExistsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('CheckUser', checkUserExistsSchema);
