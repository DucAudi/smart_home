// server/controllers/deviceController.js

const Device = require('../models/device');

// Thêm thiết bị
exports.addDevice = async (req, res) => {
  const { name, type, status, data, location, userId } = req.body;
  
  try {
    const device = new Device({ name, type, status, data, location, userId });
    await device.save();
    res.status(201).json({ message: 'Device added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding device', error });
  }
};

// Lấy danh sách thiết bị
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error });
  }
};
