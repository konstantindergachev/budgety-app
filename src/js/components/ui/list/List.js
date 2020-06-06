import PropTypes from 'prop-types';
import React from 'react';
import Percentage from '../../../components/content/budget/expenses/percentage/Percentage';
import formatNumber from '../../../helpers/formatNumber';
import './List.scss';

const List = ({
  description,
  type,
  classIncome,
  classExpenses,
  income,
  expenses,
  percentage,
  handleDeleteClick,
}) => (
  <li className="summary__item">
    <div className="summary__descr">{description}</div>
    <div
      className={`summary__value ${type === '+' ? classIncome : classExpenses}`}
    >
      {type === '+' ? formatNumber(type, income) : formatNumber(type, expenses)}
    </div>
    {type === '-' ? (
      <Percentage percentage={percentage} classname="percentage__list" />
    ) : null}
    <button className="summary__del" onClick={handleDeleteClick}>
      &otimes;
    </button>
  </li>
);

List.propTypes = {
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classIncome: PropTypes.string,
  classExpenses: PropTypes.string,
  income: PropTypes.number,
  expenses: PropTypes.number,
  percentage: PropTypes.number,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default List;
