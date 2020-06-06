import PropTypes from 'prop-types';
import React from 'react';
import formatNumber from '../../../helpers/formatNumber';
import './Statistic.scss';

const Statistic = ({
  totalBalance,
  notes,
  noteDate,
  totalIncome,
  totalExpenses,
  totalPercentage,
}) => {
  const sign = totalBalance > 0 ? '+' : '-';
  const income = Object.values(notes).map(
    (value) =>
      value.id && (
        <div className="chart__income" key={value.id}>
          {value.mode === '+' && (
            <React.Fragment>
              <span className="chart__income-name">
                {value.description}:&nbsp;
              </span>
              <span className="chart__income-value">
                {formatNumber(value.mode, value.income)}грн.
              </span>
            </React.Fragment>
          )}
        </div>
      )
  );
  const expenses = Object.values(notes).map(
    (value) =>
      value.id && (
        <div className="chart__expenses" key={value.id}>
          {value.mode === '-' && (
            <React.Fragment>
              <span className="chart__expenses-name">
                {value.description}:&nbsp;
              </span>
              <span className="chart__expenses-value">
                {formatNumber(value.mode, value.expenses)}грн.
              </span>
              <span className="chart__expenses-percentages">
                {value.percentage}%
              </span>
            </React.Fragment>
          )}
        </div>
      )
  );
  return (
    <div className="chart__list">
      <span className="chart__date">{noteDate}</span>
      <div className="chart__income-title">
        Доход: {formatNumber('+', totalIncome)}грн.
      </div>
      {income}
      <div className="chart__expenses-title">
        Расход: {formatNumber('-', totalExpenses)}грн.
        <span className="chart__expenses-totalPercentage">
          {totalPercentage}%
        </span>
      </div>
      {expenses}
      <span className="chart__balance">
        Баланс: {formatNumber(sign, totalBalance)}грн.
      </span>
    </div>
  );
};

Statistic.propTypes = {
  totalBalance: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  noteDate: PropTypes.string.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  totalPercentage: PropTypes.number.isRequired,
};
export default Statistic;
