import PropTypes from 'prop-types';
import React from 'react';
import formatNumber from '../../../../helpers/formatNumber';
import Title from '../../../ui/title/Title';
import './Income.scss';

const Income = ({ getMode, getIncome }) => {
  return (
    <div className="budget__income">
      <Title name="Доходы" />
      <div className="value">
        {formatNumber(getMode[getMode.length - 1], getIncome())}
      </div>
    </div>
  );
};

Income.propTypes = {
  getMode: PropTypes.array.isRequired,
  getIncome: PropTypes.func.isRequired,
};

export default Income;
