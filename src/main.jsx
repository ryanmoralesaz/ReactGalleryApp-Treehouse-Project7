import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the app in browser router for navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
