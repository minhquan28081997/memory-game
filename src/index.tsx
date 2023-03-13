import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Add ! after 'document.getEl...' to check the value never null
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

