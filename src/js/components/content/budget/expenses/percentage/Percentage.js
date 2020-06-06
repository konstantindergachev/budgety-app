import PropTypes from 'prop-types';
import React from 'react';
import './Percentage.scss';

const Percentage = ({ classname, percentage }) => {
  return (
    <div className={classname}>
      {percentage > 0 ? (
        `${percentage.toFixed(2)}%`
      ) : percentage === '> 100' ? (
        `${percentage}%`
      ) : (
        '--'
      )}
    </div>
  );
};

Percentage.propTypes = {
  classname: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default Percentage;
