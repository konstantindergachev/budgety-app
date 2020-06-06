import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigation/NavigationItems';
import DrawerToggle from '../sidedrawer/drawertoggle/DrawerToggle';
import './Toolbar.scss';

const Toolbar = ({ drawerToggleClicked, getToken }) => (
  <header className="header">
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className="header__logo">
      <Logo />
    </div>
    <nav className="desktop__only">
      <NavigationItems token={getToken} />
    </nav>
  </header>
);

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  getToken: PropTypes.string,
};

export default Toolbar;
