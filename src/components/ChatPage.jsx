import React from 'react';
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className="safe-area-container">
      <header className="chat-header">
        Header
      </header>
      
      <main className="chat-content">
        <div className="message">Message</div>
      </main>
      
      <div className="chat-input-area">
        <input 
          type="text" 
          className="chat-input" 
          placeholder="Type a message..." 
        />
      </div>
    </div>
  );
};

export default ChatPage;

