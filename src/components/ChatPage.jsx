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
        <div className="messages-container">
          <div className="message message-sent">Привет! Как дела?</div>
          <div className="message message-received">Привет! Всё отлично, спасибо!</div>
          <div className="message message-sent">Отлично! Что планируешь на выходные?</div>
          <div className="message message-received">Планирую отдохнуть и посмотреть новый фильм</div>
          <div className="message message-sent">Звучит здорово! Какой фильм?</div>
          <div className="message message-received">Ещё не решил, может быть что-то из новинок</div>
          <div className="message message-sent">Понятно, дай знать, если что интересное найдёшь</div>
          <div className="message message-received">Конечно, обязательно расскажу!</div>
          <div className="message message-sent">Отлично, буду ждать!</div>
          <div className="message message-received">Хорошо, до встречи!</div>
          <div className="message message-sent">До встречи! Хороших выходных!</div>
          <div className="message message-received">Спасибо, тебе тоже!</div>
        </div>
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

