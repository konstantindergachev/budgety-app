import React, { Component } from 'react';
import { MyContext } from '../../provider/MyProvider';
import Statistic from './statistic/Statistic';
import './Statistics.scss';

class Statistics extends Component {
  componentDidMount() {
    this.props.context.getBudgetDataFromDB();
  }
  loadData = () => {
    const data = this.props.context.state.orders;
    const month = new Date().getMonth() + 1;
    return data.map((value, i) => (
      <Statistic
        key={`${Number(value.noteDate.substring(0, 2)) + (i += 1) + month}`}
        noteDate={value.noteDate}
        notes={value.arrayOfNotes}
        totalBalance={value.totalBalance}
        totalIncome={value.totalIncome}
        totalExpenses={value.totalExpenses}
        totalPercentage={value.totalPercentage}
      />
    ));
  };
  loadError = () => {
    return (
      <p className="orders__error">
        Страница перезагружена. Статистика отобразится вновь после посещения
        главной страницы. Благодарим за понимание.
      </p>
    );
  };
  render() {
    return (
      <div className="orders">
        <div className="orders__container">
          {this.props.context.state.ordersError === null ? (
            this.loadData()
          ) : this.props.context.state.ordersError !== null ? (
            this.loadError()
          ) : null}
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <MyContext.Consumer>
    {(context) => <Statistics {...props} context={context} />}
  </MyContext.Consumer>
));
