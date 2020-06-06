import PropTypes from 'prop-types';
import React from 'react';
import './Button.scss';

const Button = ({
  type,
  classname,
  btnType,
  disabled,
  clickSwitchAuthMode,
  calculateNotes,
  clickCancel,
  clickSuccess,
  tooltip,
  title,
}) => (
  <button
    type={type}
    className={`${classname} ${btnType === 'success'
      ? btnType
      : btnType === 'danger' ? btnType : null}`}
    disabled={disabled}
    onClick={
      clickSwitchAuthMode ? (
        clickSwitchAuthMode
      ) : clickCancel ? (
        clickCancel
      ) : calculateNotes ? (
        calculateNotes
      ) : (
        clickSuccess
      )
    }
    tooltip={tooltip}
  >
    {title}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  classname: PropTypes.string.isRequired,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  clickSwitchAuthMode: PropTypes.func,
  calculateNotes: PropTypes.func,
  clickCancel: PropTypes.func,
  clickSuccess: PropTypes.func,
  tooltip: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Button;
