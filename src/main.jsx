import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Vite PWA плагин автоматически регистрирует service worker
// Дополнительная регистрация не требуется

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

