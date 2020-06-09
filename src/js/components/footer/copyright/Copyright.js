import PropTypes from 'prop-types';
import React from 'react';

const Copyright = ({ data }) => (
  <h4 className="footer__copyright">
    {data} &copy; {new Date().getFullYear()}
  </h4>
);

Copyright.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Copyright;
