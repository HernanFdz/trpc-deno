/// <reference types="vite/client" />

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
