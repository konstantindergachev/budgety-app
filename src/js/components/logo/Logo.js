import React from 'react';
import logo from '../../../img/icon-money.svg';
import './Logo.scss';

const Logo = () => (
  <div className="logo">
    <img className="logo__img" src={logo} alt="Мой бюджет" />
  </div>
);
export default Logo;
