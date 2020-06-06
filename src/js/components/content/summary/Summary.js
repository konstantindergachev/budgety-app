import PropTypes from 'prop-types';
import React from 'react';
import List from '../../ui/list/List';
import Title from '../../ui/title/Title';
import './Summary.scss';

const Summary = ({ notes, removeNote }) => {
  const incomeList = Object.keys(notes).map((key) => {
    if (notes[key].mode === '+') {
      return (
        <List
          key={notes[key].id}
          type={notes[key].mode}
          description={notes[key].description}
          income={notes[key].income}
          handleDeleteClick={() => removeNote(key)}
          classIncome="summary__income"
        />
      );
    }
  });
  const expensesList = Object.keys(notes).map((key) => {
    if (notes[key].mode === '-') {
      return (
        <List
          key={notes[key].id}
          type={notes[key].mode}
          description={notes[key].description}
          expenses={notes[key].expenses}
          handleDeleteClick={() => removeNote(key)}
          percentage={notes[key].percentage}
          classExpenses="summary__expenses"
        />
      );
    }
  });
  return (
    <section className="summary">
      <div className={`summary__income`}>
        <Title name="Доходы" className={`title__summary-income`} />
        <ul className="summary__list">{incomeList}</ul>
      </div>
      <div className={`summary__expenses`}>
        <Title name="Расходы" classname={`title__summary-expenses`} />
        <ul className="summary__list">{expensesList}</ul>
      </div>
    </section>
  );
};

Summary.propTypes = {
  notes: PropTypes.object.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default Summary;
