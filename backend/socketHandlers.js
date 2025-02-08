// socketHandler.js
export const users = [];

export const handleSocketConnection = (socket, io) => {
  console.log('A user connected: ' + socket.id);

  // Handle user joining with a username
  socket.on('new user', (username) => {
    users.push({ id: socket.id, username });
    io.emit('user joined', `${username} has joined the chat`);
    console.log(`User ${username} joined`);
  });

  // Handle private message
  socket.on('private message', ({ to, message }) => {
    const receiver = users.find((user) => user.username === to);
    if (receiver) {
      io.to(receiver.id).emit('private message', {
        message,
        from: socket.id,
        to: receiver.id,
      });
    }
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
      const disconnectedUser = users[userIndex].username;
      users.splice(userIndex, 1);
      io.emit('user left', `${disconnectedUser} has left the chat`);
      console.log(`${disconnectedUser} disconnected`);
    }
  });
};
