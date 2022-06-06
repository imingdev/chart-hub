import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import 'client/assets/scss/main.scss';
import App from './App';

createRoot(document.getElementById('app-main')).render(<App />);
