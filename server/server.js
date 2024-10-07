const app = require('./app');
const http = require('http');
const socketIO = require('socket.io');

// Tạo HTTP server
const server = http.createServer(app);
const io = socketIO(server); // Khởi tạo Socket.IO

// Sử dụng Socket.IO để kết nối với ESP32
io.on('connection', (socket) => {
    console.log('ESP32 connected');
    
    // Xử lý dữ liệu nhận từ ESP32
    socket.on('message', (data) => {
        console.log('Data from ESP32:', data);
    });

    // Gửi dữ liệu đến ESP32
    socket.emit('message', 'Hello from Node.js server!');

    socket.on('disconnect', () => {
        console.log('ESP32 disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
