import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

