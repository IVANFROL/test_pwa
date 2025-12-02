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
    
    // Определяем веб-версию iOS Safari (не PWA)
    const isIOSSafariWeb = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                           !window.navigator.standalone && 
                           /Safari/.test(navigator.userAgent) &&
                           !/CriOS|FxiOS|OPiOS/.test(navigator.userAgent);
    
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
      input.setAttribute('data-chrome-autofill-ignore', 'true');
      input.setAttribute('data-google-autofill-ignore', 'true');
      
      // Для веб-версии iOS Safari используем специальную обработку
      if (isIOSSafariWeb) {
        // В Safari веб-версии type="search" может не работать, используем другой подход
        input.setAttribute('autocomplete', 'new-password');
        input.setAttribute('data-safari-autofill-ignore', 'true');
      } else {
        // Для Android Chrome - используем type="search" который часто игнорирует автозаполнение
        if (input.type !== 'search') {
          input.type = 'search';
        }
      }
      
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
      
      // Периодическая очистка автозаполнения (более агрессивно)
      clearAutofill = setInterval(() => {
        // Принудительно устанавливаем атрибуты
        if (isIOSSafariWeb) {
          // Для веб-версии iOS Safari используем 'new-password'
          input.setAttribute('autocomplete', 'new-password');
        } else {
          input.setAttribute('autocomplete', 'off');
          // Для Android - убеждаемся что type="search"
          if (input.type !== 'search') {
            input.type = 'search';
          }
        }
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        // Очищаем любые автозаполненные значения
        const currentValue = input.value;
        if (currentValue && input.matches(':-webkit-autofill')) {
          input.value = '';
          setTimeout(() => {
            if (input.value === '') {
              input.value = currentValue;
            }
          }, 0);
        }
      }, 50);
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
        <form autoComplete="off" noValidate>
          <input 
            ref={inputRef}
            type="text"
            className="chat-input" 
            placeholder="Type a message..."
            name="message-text"
            id="message-text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
            data-form-type="other"
            data-1p-ignore="true"
            data-bwignore="true"
            data-ms-ignore="true"
            data-chrome-autofill-ignore="true"
            data-google-autofill-ignore="true"
            data-safari-autofill-ignore="true"
            readOnly
            onClick={(e) => e.target.removeAttribute('readonly')}
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

