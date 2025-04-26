const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  
  const rooms = {};
  
  io.on("connection", socket => {
    socket.on("join room", roomID => {
      if (rooms[roomID]) {
        rooms[roomID].push(socket.id);
      } else {
        rooms[roomID] = [socket.id];
      }
  
      const otherUsers = rooms[roomID].filter(id => id !== socket.id);
      socket.emit("all users", otherUsers);
  
      socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit("user joined", {
          signal: payload.signal,
          callerID: payload.callerID,
        });
      });
  
      socket.on("returning signal", payload => {
        io.to(payload.callerID).emit("receiving returned signal", {
          signal: payload.signal,
          id: socket.id,
        });
      });
    });
  
    socket.on("disconnect", () => {
      for (const roomID in rooms) {
        rooms[roomID] = rooms[roomID].filter(id => id !== socket.id);
      }
    });
  });
  