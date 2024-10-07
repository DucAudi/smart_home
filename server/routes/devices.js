// server/routes/devices.js

const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new device
router.post('/', async (req, res) => {
  const device = new Device({
    name: req.body.name,
    icon: req.body.icon,
    isOn: false,
  });

  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update device status
router.patch('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (device == null) {
      return res.status(404).json({ message: 'Device not found' });
    }

    if (req.body.isOn != null) {
      device.isOn = req.body.isOn;
    }

    const updatedDevice = await device.save();
    res.json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a device
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (device == null) {
      return res.status(404).json({ message: 'Device not found' });
    }

    await device.remove();
    res.json({ message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;