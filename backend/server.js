import http from 'http';
import { Server as socketIo } from 'socket.io';
import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import { handleSocketConnection } from './socketHandlers.js';
import { corsOptions } from './corsOptions.js';

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
// const io = new socketIo(server);
const io = new socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',  // Allow requests from the React app
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    }
  });
app.use(cors(corsOptions));

io.on('connection', (socket)=> handleSocketConnection(socket, io));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});