// src/index.tsx
import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"

// Ensure the TypeScript compiler knows this is an HTMLElement
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
