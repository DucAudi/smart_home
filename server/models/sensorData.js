// server/models/SensorData.js

const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  timestamp: { type: Date, default: Date.now },
  status: { type: Boolean }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
