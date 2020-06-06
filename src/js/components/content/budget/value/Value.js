import PropTypes from 'prop-types';
import React from 'react';

const Value = ({ mode, income }) => {
  return (
    <div className="value">
      {mode[mode.length - 1] === '+' ? mode[mode.length - 1] : null}
      {mode[mode.length - 1] === '+' ? (
        income.reduce((pre, cur) => pre + cur, 0)
      ) : null}
    </div>
  );
};

Value.propTypes = {
  mode: PropTypes.array.isRequired,
  income: PropTypes.array.isRequired,
};

export default Value;
