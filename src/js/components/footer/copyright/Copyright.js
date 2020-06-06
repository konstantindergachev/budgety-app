import PropTypes from 'prop-types';
import React from 'react';

const Copyright = ({ data }) => (
  <h4 className="footer__copyright">
    {data} &copy; {new Date().toISOString().split('-')[0]}
  </h4>
);

Copyright.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Copyright;
