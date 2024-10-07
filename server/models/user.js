// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function(next) {
  // Kiểm tra nếu mật khẩu chưa được sửa đổi thì không mã hóa lại
  if (!this.isModified('password')) return next();
  // Mã hóa mật khẩu nếu mật khẩu đã được chỉnh sửa hoặc tạo mới
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});




UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('users', UserSchema);

module.exports = User;
