const bcrypt = require('bcrypt');
const User = require('../models/user');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const newUser = new User({
      username,
      password,  // Không cần mã hóa ở đây
      email,
    });

    await newUser.save();  // Mật khẩu sẽ tự động được mã hóa khi lưu

    const userInfo = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    console.log('User registered successfully:', userInfo);
    res.status(201).json({
      message: 'User registered successfully',
      user: userInfo,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};




// login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm người dùng theo username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Người dùng đã tồn tại' });
    }

    // Kiểm tra mật khẩu đã nhập có khớp với mật khẩu đã mã hóa trong database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Mật khẩu không đúng' });
    }

    // Nếu thành công, trả về thông tin người dùng
    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập' });
  }
};
