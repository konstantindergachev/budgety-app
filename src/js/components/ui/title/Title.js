import PropTypes from 'prop-types';
import React from 'react';
import './Title.scss';

const Title = ({ classname, name }) => (
  <div
    className={classname === 'budget__title' ? classname : `title ${classname}`}
  >
    {name}
  </div>
);

Title.propTypes = {
  classname: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Title;
