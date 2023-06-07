import React, { useState } from 'react';
import { getChatAPIResponse } from '../api/chatAPI';

const ChatInterface = () => {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessages([...messages, { type: 'User', content }]);

    try {
      const response = await getChatAPIResponse(content);
      const responseContent = response.message; // Adjust it according to the GCP response structure
      setMessages([messages, { type: 'Assistant', content: responseContent }]);
    } catch (error) {
      console.error(error);
    }

    setContent('');
  };

  return (
    <div className="chat-interface">
      <h1>Chat</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-${message.type.toLowerCase()}`}>
            <span>{message.type}: </span>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
