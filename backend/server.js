// server.js
import http from 'http';
import { Server } from 'socket.io';

// Import the connection handler function
import { handleConnection } from './socketHandlers.js';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Socket.IO Server is running');
});

const io = new Server(3000); // Create a Socket.IO server on port 3000

// Create socket.io instance and pass the server
// const io = socketIo(server);

// Handle socket connections using the imported function
io.on('connection', handleConnection);

// Start the server on port 3000
server.listen(3001, () => {
    console.log('Server is listening on http://localhost:3000');
});
