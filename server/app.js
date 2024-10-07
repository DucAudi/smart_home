  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv');

  // Load biến môi trường từ file .env
  dotenv.config();

  const userRoutes = require('./routes/users');
  const deviceRoutes = require('./routes/devices');
  const sensorDataRoutes = require('./routes/sensorData');

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/users', userRoutes);
  app.use('/api/devices', deviceRoutes);
  app.use('/api/sensor-data', sensorDataRoutes);

  // Kết nối cơ sở dữ liệu MongoDB Atlas
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully to SmartHome'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

  module.exports = app;
