import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3001';
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('spotify_token')}`;
    config.headers['Content-Type'] = `application/json`;
        return config;
    },
    error => {
        if(error.response.status == 403){
            // refreshToken()
        }
    }
);

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

