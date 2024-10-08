// server/models/Device.js

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true

  },
  icon: {
    type: String,
    required: true
  },
  isOn: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);