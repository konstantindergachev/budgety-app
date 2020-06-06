import PropTypes from 'prop-types';
import React from 'react';
import formatNumber from '../../../../helpers/formatNumber';
import Title from '../../../ui/title/Title';
import './Expenses.scss';
import Percentage from './percentage/Percentage';

const Expenses = ({ getMode, getExpenses, totalPercentage }) => {
  return (
    <div className="budget__expenses">
      <Title name="Расходы" />
      <div className="value">
        {formatNumber(
          getMode[getMode.length - 1],
          getExpenses.reduce((pre, cur) => pre - cur, 0)
        )}
      </div>
      <Percentage classname="percentage" percentage={totalPercentage()} />
    </div>
  );
};

Expenses.propTypes = {
  getMode: PropTypes.array.isRequired,
  getExpenses: PropTypes.array.isRequired,
  totalPercentage: PropTypes.func.isRequired,
};

export default Expenses;
