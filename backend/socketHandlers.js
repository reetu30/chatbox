// socketHandlers.js
export const handleConnection = (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Handle socket disconnect event
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // Handle socket error event
    socket.on('error', (err) => {
        console.error(`Socket error: ${err}`);
    });

    // You can add other socket event listeners here, e.g., custom events
};
