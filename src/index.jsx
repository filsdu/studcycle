// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Changed from index.css to App.css
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);