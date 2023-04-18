const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  dni: String,
  createdAt: Date,
});

module.exports = mongoose.model('User', UserSchema);
