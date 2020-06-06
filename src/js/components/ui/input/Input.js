import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  invalid,
  shouldValidate,
  touched,
  elementType,
  elementConfig,
  value,
  changed,
}) => {
  let inputElement = null;
  const inputClasses = [ 'input__el' ];

  if (invalid && shouldValidate && touched) inputClasses.push('invalid');

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea {...elementConfig} value={value} onChange={changed} />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed}
      />;
      break;
  }
  return <div className="input">{inputElement}</div>;
};

Input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  elementType: PropTypes.string.isRequired,

  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
};

export default Input;
