import React, { useState } from 'react';

const ChatBox = ({ selectedUser, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message && selectedUser) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="ml-6 flex-1 flex flex-col h-full">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <h3 className="text-lg">Chat with: {selectedUser}</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {/* Chat history will be displayed here */}
      </div>
      <div className="bg-gray-200 p-4 rounded-b-lg flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
