import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App'
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/SwaRAG-FrontEnd'>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)