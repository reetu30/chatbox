import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'
const socket = io('http://localhost:3001');

const Chatbox = () => {
    const [msg, setMsg] = useState([])
    const [inputMessage, setInputMessage] = useState('');

    useEffect(()=>{
        socket.on('chat message', (msg)=>{
            setMsg((prev) => [...prev, msg])
        })

        return ()=>{
            socket.off('chat message')
        }
    }, []);

    const handleInputChange = (e)=>{
        setInputMessage(e.target.value)
    }

    const handleSendMessage = ()=>{
        if (inputMessage.trim()) {
            socket.emit('chat message', inputMessage);
            setMsg((prev) => [...prev, inputMessage]);
            setInputMessage('')
        }
    }
  return (
    <div className="chat-container">
            <div className="chat-box">
                {msg.map((msgg, index) => (
                    <div key={index} className="chat-message">
                        {msgg}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
    </div>
  )
}

export default Chatbox