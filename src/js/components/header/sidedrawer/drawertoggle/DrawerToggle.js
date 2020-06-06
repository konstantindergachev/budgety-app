import PropTypes from 'prop-types';
import React from 'react';
import './DrawerToggle.scss';

const DrawerToggle = ({ clicked }) => (
  <div className="menu" onClick={clicked}>
    <div />
    <div />
    <div />
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
