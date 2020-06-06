import PropTypes from 'prop-types';
import React from 'react';
import formatNumber from '../../../helpers/formatNumber';
import Spinner from '../../ui/spinner/Spinner';
import Title from '../../ui/title/Title';
import './Budget.scss';
import Expenses from './expenses/Expenses';
import Income from './income/Income';

const Budget = ({
  notes,
  getDateHandler,
  getTotalIncome,
  getTotalPercentage,
  loading,
  ordersFromDB,
}) => {
  const displaySign = () => {
    let type;
    const totalBalance = notes.note.totalBalance;
    totalBalance > 0
      ? (type = '+')
      : totalBalance < 0 ? (type = '-') : (type = null);
    return type;
  };

  return (
    <div className="budget">
      <Title
        classname="budget__title"
        name={`Посчитай свой бюджет на ${getDateHandler().substring(0, 18)}`}
      />
      <div className="budget__value">
        {loading === true ? (
          <Spinner />
        ) : (
          formatNumber(displaySign(), notes.note.totalBalance)
        )}
      </div>
      <Income
        getMode={Object.keys(notes).map(
          (key) => (notes[key].mode === '+' ? notes[key].mode : '+')
        )}
        getIncome={getTotalIncome}
        totalIncomeFromDB={ordersFromDB.totalIncome}
      />
      <Expenses
        getMode={Object.keys(notes).map(
          (key) => (notes[key].mode === '-' ? notes[key].mode : '-')
        )}
        getExpenses={Object.keys(notes).map(
          (key) => (notes[key].mode === '-' ? notes[key].expenses : null)
        )}
        totalPercentage={getTotalPercentage}
        totalExpensesFromDB={ordersFromDB.totalExpenses}
        totalPercentageFromDB={ordersFromDB.totalPercentage}
      />
    </div>
  );
};

Budget.propTypes = {
  notes: PropTypes.object.isRequired,
  getDateHandler: PropTypes.func.isRequired,
  getTotalIncome: PropTypes.func.isRequired,
  getTotalPercentage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ordersFromDB: PropTypes.array.isRequired,
};

export default Budget;
