// server/routes/sensorData.js

const express = require('express');
const router = express.Router();
const { addSensorData, getSensorData } = require('../controllers/sensorDataController');

router.post('/add', addSensorData);
router.get('/', getSensorData);

module.exports = router;
