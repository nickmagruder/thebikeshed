import React from 'react';
import ReactDOM from 'react-dom';
import { browserRouter } from 'react-router-dom';

import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <browserRouter>
      <App />
    </browserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

