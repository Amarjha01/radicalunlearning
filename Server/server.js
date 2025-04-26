// 1. Core imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
dotenv.config();

// 2. Import your routes
import DataBaseConfig from './config/dataBase/DataBaseConfig.js'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import verificationRouter from './routes/verification.js'

// 3. App and Server creation
const app = express();
app.use(cookieParser()); 
const server = createServer(app);  // 🔥 create a real HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173", "https://dev.radical-unlearning.com"],
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// 4. Middleware
app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:4173", "https://dev.radical-unlearning.com"]
}));
app.use(express.json());

// 5. Routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/verify', verificationRouter);

// 6. Your WebRTC Rooms logic (socket.io)
const rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }

    const otherUsers = rooms[roomID].filter(id => id !== socket.id);
    socket.emit("all users", otherUsers);

    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });
  });

  socket.on("disconnect", () => {
    for (const roomID in rooms) {
      rooms[roomID] = rooms[roomID].filter(id => id !== socket.id);
      if (rooms[roomID].length === 0) {
        delete rooms[roomID];
      }
    }
  });
});

// 7. Database connection and server start
const PORT = process.env.PORT || 30001;

DataBaseConfig().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port:', PORT);
  });
});
