import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './js/App';
import { MyProvider } from './js/provider/MyProvider';
import './main.scss';

const app = (
  <MyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyProvider>
);

ReactDOM.render(app, document.getElementById('root'));
