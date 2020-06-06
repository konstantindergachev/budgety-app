import PropTypes from 'prop-types';
import React from 'react';
import NavigationItem from './navigationitem/NavigationItem';
import './NavigationItems.scss';

const NavigationItems = ({ token }) => (
  <ul className="navigation__items">
    <NavigationItem link="/" exact>
      Главная
    </NavigationItem>
    {!token ? (
      <NavigationItem link="/auth">Аутентификация</NavigationItem>
    ) : (
      <React.Fragment>
        <NavigationItem link="/statistics">Статистика</NavigationItem>
        <NavigationItem link="/logout">Выход</NavigationItem>
      </React.Fragment>
    )}
  </ul>
);

NavigationItems.propTypes = {
  token: PropTypes.string,
};

export default NavigationItems;
