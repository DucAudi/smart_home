#include "FS.h"
#include <WiFi.h>
#include <WebSocketsClient.h>


// WiFi
const char* ssid = "MERCUSYS_8364";
const char* password = "Hesolyly";

// Địa chỉ WebSocket server 
const char* websocket_server = "192.168.2.100";  // Địa chỉ IP server
const uint16_t websocket_port =5000;            // Port của server
const char* websocket_path = "/socket.io/";      

WebSocketsClient webSocket;

// Hàm xử lý sự kiện WebSocket
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.println("[WSc] Disconnected!");
            break;
        case WStype_CONNECTED:
            Serial.println("[WSc] Connected to server");
            // Gửi tin nhắn tới server sau khi kết nối
            webSocket.sendTXT("Hello from ESP32");
            break;
        case WStype_TEXT:
            Serial.printf("[WSc] Received text: %s\n", payload);
            // Xử lý dữ liệu nhận được từ server
            break;
        case WStype_BIN:
            Serial.printf("[WSc] Received binary data, length: %u\n", length);
            break;
        case WStype_PING:
            Serial.println("[WSc] Received ping");
            break; 
        case WStype_PONG:
            Serial.println("[WSc] Received pong");
            break;
    }
}

void setup() {
    Serial.begin(115200);

    // Kết nối WiFi
    WiFi.begin(ssid, password);
    Serial.println("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("Connected to WiFi!");
    delay(2000);

    // Khởi tạo WebSocket và kết nối với server
    webSocket.begin(websocket_server, websocket_port, websocket_path);
    Serial.println("begin to Websocket");
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    // Duy trì kết nối WebSocket
    webSocket.loop();

    // Gửi tin nhắn định kỳ (nếu cần)
    static uint32_t lastTime = 0;
    if (millis() - lastTime > 5000) {  // Mỗi 5 giây gửi 1 lần
        lastTime = millis();
        webSocket.sendTXT("ESP32 says hi!");
    }
}
