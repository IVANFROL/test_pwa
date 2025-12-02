import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';

const ChatPage = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Определение открытия/закрытия клавиатуры на iOS
    const handleFocus = () => {
      setIsKeyboardOpen(true);
    };

    const handleBlur = () => {
      setIsKeyboardOpen(false);
    };

    const handleResize = () => {
      // На iOS при открытой клавиатуре viewport уменьшается
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const screenHeight = window.screen.height;
      // Если viewport значительно меньше экрана - клавиатура открыта
      setIsKeyboardOpen(viewportHeight < screenHeight * 0.75);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    // Используем visualViewport API для более точного определения
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`safe-area-container ${isKeyboardOpen ? 'keyboard-open' : ''}`}
    >
      <header className="chat-header">
        Header
      </header>
      
      <main className="chat-content">
        <div className="message">Message</div>
      </main>
      
      <div className="chat-input-area">
        <input 
          ref={inputRef}
          type="text" 
          className="chat-input" 
          placeholder="Type a message..." 
        />
      </div>
    </div>
  );
};

export default ChatPage;

