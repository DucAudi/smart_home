const mongoose = require('mongoose');
const User = require('../models/user'); // Đảm bảo đường dẫn đúng đến model User

// Kết nối với MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
  return User.deleteMany({}); // Xóa toàn bộ người dùng
})
.then(() => {
  console.log('All users deleted successfully.');
  mongoose.connection.close(); // Đóng kết nối sau khi xóa
})
.catch(err => {
  console.error('Error while deleting users:', err);
  mongoose.connection.close(); // Đóng kết nối nếu có lỗi
});
