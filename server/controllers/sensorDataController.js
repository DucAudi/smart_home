// server/controllers/sensorDataController.js

const SensorData = require('../models/sensorData');

// Thêm dữ liệu cảm biến
exports.addSensorData = async (req, res) => {
  const { deviceId, temperature, humidity, status } = req.body;
  
  try {
    const sensorData = new SensorData({ deviceId, temperature, humidity, status });
    await sensorData.save();
    res.status(201).json({ message: 'Sensor data added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding sensor data', error });
  }
};

// Lấy dữ liệu cảm biến
exports.getSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.status(200).json(sensorData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensor data', error });
  }
};
