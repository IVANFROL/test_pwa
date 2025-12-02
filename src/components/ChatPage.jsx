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
    let clearAutofill = null;
    let handleInputFocus = null;
    let handleInputClick = null;
    
    if (input) {
      // Агрессивное отключение автозаполнения через JavaScript
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      input.setAttribute('data-lpignore', 'true');
      input.setAttribute('data-form-type', 'other');
      input.setAttribute('data-1p-ignore', 'true');
      input.setAttribute('data-bwignore', 'true');
      input.setAttribute('data-ms-ignore', 'true');
      
      // Обработка клика для убирания readOnly до фокуса
      handleInputClick = () => {
        if (input.hasAttribute('readonly')) {
          input.removeAttribute('readonly');
        }
      };
      
      // Очистка автозаполнения при фокусе
      handleInputFocus = () => {
        // Убираем readOnly сразу при первом взаимодействии
        if (input.hasAttribute('readonly')) {
          input.removeAttribute('readonly');
        }
        handleFocus();
        // Очищаем автозаполнение
        if (input.value && input.value.length > 0) {
          const currentValue = input.value;
          input.value = '';
          setTimeout(() => {
            input.value = currentValue;
          }, 0);
        }
      };

      input.addEventListener('click', handleInputClick);
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleBlur);
      
      // Периодическая очистка автозаполнения
      clearAutofill = setInterval(() => {
        if (input.hasAttribute('autocomplete')) {
          input.removeAttribute('autocomplete');
          input.setAttribute('autocomplete', 'off');
        }
      }, 100);
    }

    // Используем visualViewport API для более точного определения
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (input) {
        if (handleInputClick) {
          input.removeEventListener('click', handleInputClick);
        }
        if (handleInputFocus) {
          input.removeEventListener('focus', handleInputFocus);
        }
        input.removeEventListener('blur', handleBlur);
        if (clearAutofill) {
          clearInterval(clearAutofill);
        }
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
          name="x-ignore-autofill"
          id="x-ignore-autofill"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          data-1p-ignore="true"
          data-bwignore="true"
          data-ms-ignore="true"
          readOnly
          onClick={(e) => e.target.removeAttribute('readonly')}
          onFocus={(e) => e.target.removeAttribute('readonly')}
        />
      </div>
    </div>
  );
};

export default ChatPage;

