import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Importamos el CSS mejorado
import App from './App'; // Corregido: importación simple del componente App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);