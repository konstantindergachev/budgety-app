import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getDate from '../../helpers/getDate';
import { MyContext } from '../../provider/MyProvider';
import Button from '../ui/button/Button';
import Budget from './budget/Budget';
import './Content.scss';
import Controls from './controls/Controls';
import Summary from './summary/Summary';

class Content extends Component {
  updatedTotalPercentage = (updatedArrayOfPercentage) => {
    const totalPercentage = updatedArrayOfPercentage.reduce(
      (prev, curr) => prev + curr,
      0
    );
    return totalPercentage;
  };
  getPersonalItemPercentage = (...values) => {
    const [
      data,
      expensesCost,
      getIncome,
      sumOfValuesIncomeAfterDelete,
      sumOfValuesExpensesAfterDelete,
    ] = values;
    const addIncomeToTheList = expensesCost + getIncome;
    const arrayAddIncomeToTheList = [];
    const arrayOfExpenses = Object.values(data.notes)
      .map((value) => value.expenses)
      .filter((value) => value !== 0);
    if (expensesCost !== 0) arrayOfExpenses.push(expensesCost);

    let calculatedPercentage = data.notes.note.percentage;
    const arrayOfNewPersonalPercentageAfterIncomeDelete = [];
    arrayOfExpenses.forEach((value) => {
      if (
        getIncome > 0 &&
        sumOfValuesIncomeAfterDelete === undefined &&
        data.list
      ) {
        calculatedPercentage = Math.round(value / addIncomeToTheList * 100);
        if (calculatedPercentage < 0) {
          const absPercentage = Math.abs(calculatedPercentage);
          arrayAddIncomeToTheList.push(absPercentage);
        }
      } else if (
        getIncome > 0 &&
        sumOfValuesIncomeAfterDelete === undefined &&
        !data.list
      ) {
        calculatedPercentage = Math.round(value / getIncome * 100);
        return calculatedPercentage;
      } else if (getIncome > 0 && sumOfValuesIncomeAfterDelete > 0) {
        calculatedPercentage = Math.round(
          Math.abs(value) / sumOfValuesIncomeAfterDelete * 100
        );
        arrayOfNewPersonalPercentageAfterIncomeDelete.push(
          calculatedPercentage
        );
        return arrayOfNewPersonalPercentageAfterIncomeDelete;
      }
    });
    const newArrayOfExpenses = arrayOfExpenses.filter(
      (value) => value !== expensesCost
    );
    const arrayOfNewPersonalPercentageAfterExpensesDelete = [];
    newArrayOfExpenses.forEach((value) => {
      if (
        expensesCost !== 0 &&
        sumOfValuesExpensesAfterDelete < 0 &&
        sumOfValuesIncomeAfterDelete !== 0
      ) {
        calculatedPercentage = Math.round(
          Math.abs(value) / sumOfValuesIncomeAfterDelete * 100
        );
        arrayOfNewPersonalPercentageAfterExpensesDelete.push(
          calculatedPercentage
        );
        return arrayOfNewPersonalPercentageAfterExpensesDelete;
      } else if (
        expensesCost !== 0 &&
        sumOfValuesExpensesAfterDelete < 0 &&
        sumOfValuesIncomeAfterDelete === 0
      ) {
        calculatedPercentage = Math.abs(value) * 100;
        arrayOfNewPersonalPercentageAfterExpensesDelete.push(
          calculatedPercentage
        );
        return arrayOfNewPersonalPercentageAfterExpensesDelete;
      }
    });

    return getIncome > 0 &&
    sumOfValuesIncomeAfterDelete === undefined &&
    data.list
      ? arrayAddIncomeToTheList
      : getIncome > 0 &&
        sumOfValuesIncomeAfterDelete === undefined &&
        !data.list
        ? calculatedPercentage
        : getIncome > 0 && sumOfValuesIncomeAfterDelete > 0
          ? arrayOfNewPersonalPercentageAfterIncomeDelete
          : getIncome === 0 && sumOfValuesExpensesAfterDelete <= 0
            ? arrayOfNewPersonalPercentageAfterExpensesDelete
            : getIncome === 0 && sumOfValuesIncomeAfterDelete === undefined
              ? expensesCost * 100
              : 0;
  };
  addNote = (noteMode, noteDescr, noteCost) => {
    const data = this.props.context.state;
    let expensesCost = data.notes.note.expenses;
    let incomeCost = data.notes.note.income;
    let newPersonalPercentage = data.notes.note.percentage;
    let updatedArrayOfPercentage = data.notes.note.percentage;

    const getIncome = this.props.context.getTotalIncome();

    switch (noteMode) {
      case '+':
        {
          incomeCost = noteCost;
          data.notes.note.totalBalance += incomeCost;
          data.list = true;
          updatedArrayOfPercentage = this.getPersonalItemPercentage(
            data,
            noteCost,
            getIncome
          );
          Object.values(data.notes).forEach((note) => {
            if (
              note.percentage > 0 &&
              Array.isArray(updatedArrayOfPercentage) !== false
            ) {
              note.percentage = updatedArrayOfPercentage.shift();
            } else if (
              note.percentage > 0 &&
              Array.isArray(updatedArrayOfPercentage) === false
            ) {
              note.percentage = Math.round(
                Math.abs(note.expenses) / incomeCost * 100
              );
            }
          });
        }
        break;
      case '-':
        {
          expensesCost = noteCost * -1;
          data.notes.note.totalBalance += expensesCost;
          data.list = false;
          newPersonalPercentage = this.getPersonalItemPercentage(
            data,
            noteCost,
            getIncome
          );
        }
        break;
      default:
        alert(`Выберите знак "+" или знак "-"`);
        break;
    }
    const timestamp = new Date().getTime();
    const updateNote = {
      id: timestamp,
      mode: noteMode,
      description: noteDescr,
      income: incomeCost,
      expenses: expensesCost,
      totalBalance: data.notes.note.totalBalance,
      percentage: newPersonalPercentage,
    };

    data.notes[`note-${timestamp}`] = updateNote;
    this.setState({ notes: updateNote });
  };
  deleteNote = (keyField) => {
    let percentageAfterDelete = [];
    const data = this.props.context.state;
    const sumOfValuesIncome = Object.values(data.notes)
      .map((value) => value.income)
      .reduce((pre, cur) => pre + cur, 0);
    const sumOfValuesExpenses = Object.values(data.notes)
      .map((value) => value.expenses)
      .reduce((pre, cur) => pre + cur, 0);
    Object.keys(data.notes).forEach((noteName) => {
      if (noteName === keyField) {
        const updatedTotalBalance =
          data.notes.note.totalBalance -
          data.notes[noteName].income -
          data.notes[noteName].expenses;
        data.notes.note.totalBalance = updatedTotalBalance;
        const sumOfValuesIncomeAfterDelete =
          sumOfValuesIncome - data.notes[noteName].income;
        const sumOfValuesExpensesAfterDelete =
          sumOfValuesExpenses - data.notes[noteName].expenses;
        percentageAfterDelete = this.getPersonalItemPercentage(
          data,
          data.notes[noteName].expenses,
          data.notes[noteName].income,
          sumOfValuesIncomeAfterDelete,
          sumOfValuesExpensesAfterDelete
        );
        delete data.notes[noteName];
      }
    });

    Object.values(data.notes).forEach((value) => {
      if (value.percentage > 0 && percentageAfterDelete !== 0) {
        value.percentage = percentageAfterDelete.shift();
      } else if (value.percentage > 0 && percentageAfterDelete === 0) {
        value.percentage = Math.abs(value.expenses) * 100;
      }
    });

    this.setState({ notes: data.notes });
  };
  calculateNotesHandler = () => {
    let arrayOfNotes = Object.values(this.props.context.state.notes).map(
      (value) => value
    );
    const noteDate = getDate();
    return this.props.context.saveListHandler(
      this.props.history,
      arrayOfNotes,
      noteDate
    );
  };

  render() {
    const arrayOfNotes = Object.values(this.props.context.state.notes).map(
      (value) => value
    );
    return (
      <div className="content">
        <Budget
          notes={this.props.context.state.notes}
          getDateHandler={getDate}
          getTotalIncome={this.props.context.getTotalIncome}
          getTotalPercentage={this.props.context.getTotalPercentage}
          loading={this.props.context.state.loading}
          // userId={this.props.context.state.userId}
          // token={this.props.context.state.token}
          ordersFromDB={this.props.context.state.orders}
        />
        <Controls addNoteForm={this.addNote} />
        <Summary
          notes={this.props.context.state.notes}
          removeNote={this.deleteNote}
        />
        <Button
          classname={
            arrayOfNotes.length - 1 === 0 ? (
              'button__order-hiden'
            ) : (
              'button button__order'
            )
          }
          title={
            this.props.context.state.token === null ? (
              'зарегистрироваться и сохранить бюджет'
            ) : (
              'сохранить бюджет'
            )
          }
          calculateNotes={() => this.calculateNotesHandler()}
        />
      </div>
    );
  }
}

Content.propTypes = {
  history: PropTypes.object.isRequired,
};

export default React.forwardRef((props, ref) => (
  <MyContext.Consumer>
    {(context) => <Content {...props} context={context} />}
  </MyContext.Consumer>
));
