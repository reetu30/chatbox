import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBox from '../src/Chatbox/Chatbox';
import UserList from './UserList';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const socketConnection = socketIOClient('http://localhost:3001');
    setSocket(socketConnection);

    socketConnection.on('connect', () => {
      console.log('Connected to server');
    });

    socketConnection.on('user joined', (message) => {
      console.log(message);
      socketConnection.emit('get users');
    });

    socketConnection.on('user left', (message) => {
      console.log(message);
      socketConnection.emit('get users');
    });

    socketConnection.on('private message', (data) => {
      console.log('Private message received:', data);
    });

    socketConnection.on('user list', (users) => {
      setConnectedUsers(users);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handleJoinChat = () => {
    if (socket && username) {
      socket.emit('new user', username);
    }
  };

  const handlePrivateMessage = (message) => {
    if (socket && selectedUser) {
      socket.emit('private message', { to: selectedUser, message });
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      {!username ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Join the Chat</h2>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleJoinChat}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <div className="flex w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <UserList
            users={connectedUsers}
            onSelectUser={setSelectedUser}
          />
          <ChatBox
            selectedUser={selectedUser}
            onSendMessage={handlePrivateMessage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
