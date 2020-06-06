import PropTypes from 'prop-types';
import React from 'react';
import './Backdrop.scss';

const Backdrop = ({ show, clicked }) =>
  show && <div className="backdrop" onClick={clicked} />;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
