import React from 'react';
import notFound from '../../../img/money-bill_404.gif';

const ErrorHandler = () => (
  <div className="error__page">
    <img className="error__page-img" src={notFound} alt="My burger" />
    <h3 className="error__page-title">Страница не найдена</h3>
  </div>
);
export default ErrorHandler;
