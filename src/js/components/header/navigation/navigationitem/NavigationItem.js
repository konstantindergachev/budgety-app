import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.scss';

const NavigationItem = ({ link, active, children }) => (
  <li className="navigation__item">
    <NavLink
      to={link}
      exact
      className={active ? `navigation__link active` : `navigation__link`}
    >
      {children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default NavigationItem;
