import PropTypes from 'prop-types';
import React, { Component } from 'react';
import URL from '../../../settings';
import data from '../../data/data';

//1. создаем новый контекст
const MyContext = React.createContext();

//2. создаем компонент провайдера
class MyProvider extends Component {
  constructor() {
    super();
    this.state = {
      notes: {
        note:
          data.notes.note === null
            ? fetch(`${URL.dbURL}/note.json`)
                .then((response) => {
                  if (response.ok) return response.json();
                  else return Promise.reject('Error!');
                })
                .then((data) => {
                  this.setState({
                    notes: {
                      note: {
                        income: data.income,
                        expenses: data.expenses,
                        totalBalance: data.totalBalance,
                        percentage: data.percentage,
                      },
                    },
                    loading: false,
                  });
                })
                .catch((err) => {
                  this.setState({ error: true });
                  console.error(`Ошибка загрузки данных с БД: `, err);
                })
            : data.notes.note,
      },
      noteDate: data.noteDate,
      header: data.header,
      list: data.list,
      orders: data.orders,
      ordersError: data.ordersError,
      error: data.error,
      formIsValid: data.formIsValid,
      auth: data.auth,
      isSignUp: data.isSignUp,
      loading: data.loading,
      token: data.token,
      userId: data.userId,
      authError: data.authError,
      footerSection: data.footerSection,
    };

    this.checkValidity = this.checkValidity.bind(this);
    this.autoLogOut = this.autoLogOut.bind(this);
    this.logOut = this.logOut.bind(this);
    this.authSuccess = this.authSuccess.bind(this);
    this.authError = this.authError.bind(this);
    this.reloadAuthState = this.reloadAuthState.bind(this);
    this.calculateStatisticsFromDB = this.calculateStatisticsFromDB.bind(this);
  }
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  autoLogOut(expirationTime) {
    const milliseconds = 1000;
    setTimeout(() => {
      console.time(`Time`);
      this.setState({
        token: null,
        userId: null,
      });
      console.timeEnd(`Time`);
    }, expirationTime * milliseconds);
  }
  logOut(note) {
    for (const key in note) {
      if (note[key] !== 0) note[key] = 0;
    }
    this.setState({
      notes: { note: note },
      token: null,
      userId: null,
      auth: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Почтовый Адрес', //Mail Address
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Пароль', //Password
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
    });
  }
  authSuccess(token, userId) {
    return { token, userId };
  }
  authError(existError) {
    this.setState({ authError: existError });
  }
  reloadAuthState(note, token, userId) {
    this.setState({
      notes: { note: note },
      token: token,
      userId: userId,
    });
  }
  calculateStatisticsFromDB(arrayData) {
    const arrayNotes = arrayData.map((stat) => stat[1]);
    let arrayOfIncomeValue = 0;
    let arrayOfExpensesValue = 0;
    let arrayOfExpensesPercentageValue = 0;
    let totalBalance = 0;
    let statisticNote = {};
    const statisticNotes = [];
    for (let i = 0; i < arrayNotes.length; i++) {
      arrayOfIncomeValue = Object.values(arrayNotes[i].note).map(
        (value) => value.income
      );
      arrayOfExpensesValue = Object.values(arrayNotes[i].note).map(
        (value) => value.expenses
      );
      arrayOfExpensesPercentageValue = Object.values(arrayNotes[i].note).map(
        (value) => value.percentage
      );
      totalBalance = Object.values(arrayNotes[i].note).map(
        (value) => value.totalBalance
      );
      statisticNote = {
        arrayOfNotes: arrayNotes[i].note,
        totalIncome: arrayOfIncomeValue.reduce((pre, cur) => pre + cur, 0),
        totalExpenses: Number(
          arrayOfExpensesValue.reduce((pre, cur) => pre + cur, 0).toFixed(2)
        ), //*
        totalPercentage: arrayOfExpensesPercentageValue.reduce(
          (pre, cur) => pre + cur,
          0
        ),
        totalBalance: totalBalance[0],
        noteDate: arrayNotes[i].noteDate,
      };
      statisticNotes.push(statisticNote);
    }
    return statisticNotes;
  }

  render() {
    const updateData = JSON.parse(JSON.stringify(this.state));
    return (
      <MyContext.Provider
        value={{
          state: updateData,
          getTotalIncome: () => {
            const totalIncome = Object.entries(updateData.notes)
              .map(([ key, value ]) => value.income)
              .reduce((prev, curr) => prev + curr, 0);
            return totalIncome;
          },
          getTotalPercentage: () => {
            const totalPercentage = Object.values(updateData.notes)
              .map((value) => value.percentage)
              .reduce((prev, curr) => prev + curr, 0);
            return totalPercentage;
          },
          saveListHandler: (history, arrayOfNotes, updateNoteDate) => {
            const notes = {
              note: arrayOfNotes,
              userId: updateData.userId,
              noteDate: updateNoteDate,
            };
            if (updateData.token !== null) {
              this.setState({ loading: true });
              fetch(`${URL.dbURL}/budget.json?auth=${updateData.token}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(notes),
              })
                .then((response) => {
                  if (response.ok) return response.json();
                  else return Promise.reject('somthing went wrong!');
                })
                .then(() => {
                  this.setState({ loading: false });
                  history.push('/statistics');
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  console.error(`Error: `, err);
                });
              this.setState({ list: true });
            } else {
              history.push('/auth');
            }
          },
          authSubmitHandler: (ev, email, password, isSignup, history) => {
            ev.preventDefault();

            this.setState({ loading: true });
            const authData = {
              email,
              password,
              returnSecureToken: true,
            };

            fetch(!isSignup ? URL.auth_URL : URL.verifyPassword, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(authData),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else if (!response.ok) return response.json();
              })
              .then((data) => {
                if (data.error) return Promise.reject(data.error);

                localStorage.setItem('token', data.idToken);
                const milliseconds = 1000;
                const exporationDate = new Date(
                  new Date().getTime() + data.expiresIn * milliseconds
                );
                localStorage.setItem('expirationDate', exporationDate);
                localStorage.setItem('userId', data.localId);

                this.setState({
                  loading: false,
                  token: data.idToken,
                  userId: data.localId,
                });

                this.autoLogOut(Number(data.expiresIn));
                history.push('/');
              })
              .catch((err) => {
                this.setState({ loading: false });
                this.authError(err.errors[0].message);
              });
          },
          inputAuthDataChangedHandler: (ev, inputIdentifier) => {
            const updatedAuth = updateData.auth;
            const updatedFormElement = {
              ...updatedAuth[inputIdentifier],
            };

            updatedFormElement.value = ev.target.value;
            updatedFormElement.valid = this.checkValidity(
              updatedFormElement.value,
              updatedFormElement.validation
            );
            updatedFormElement.touched = true;
            updatedAuth[inputIdentifier] = updatedFormElement;

            let updatedformIsValid = true;
            for (const inputIdentifier in updatedAuth) {
              updatedformIsValid =
                updatedAuth[inputIdentifier].valid && updatedformIsValid;
            }

            this.setState({
              auth: updatedAuth,
              formIsValid: updatedformIsValid,
            });
          },
          switchAuthModeHandler: () => {
            this.setState({ isSignUp: !updateData.isSignUp });
          },
          authCheckState: () => {
            const token = localStorage.getItem('token');
            if (!token) {
              this.logOut(updateData.notes.note);
            } else {
              const expirationDate = new Date(
                localStorage.getItem('expirationDate')
              );
              if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                this.reloadAuthState(updateData.notes.note, token, userId);
              } else {
                const userId = localStorage.getItem('userId');
                this.authSuccess(token, userId);
                const milliseconds = 1000;
                this.autoLogOut(
                  (expirationDate.getTime() - new Date().getTime()) /
                    milliseconds
                );
              }
            }
          },
          authLogOut: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('content');
            localStorage.removeItem('expirationDate');
            this.logOut(updateData.notes.note);
          },
          getBudgetDataFromDB: () => {
            const userToken = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const queryParams = `${userToken}&orderBy="userId"&equalTo="${userId}"`;
            fetch(`${URL.dbURL}/budget.json?auth=${queryParams}`)
              .then(
                (response) => (response.ok ? response.json() : response.json())
              )
              .then((objData) => {
                if (objData.error) return Promise.reject(objData.error);
                const arrayData = Object.entries(objData);
                const updateNoteObject = this.calculateStatisticsFromDB(
                  arrayData
                );
                this.setState({
                  loading: false,
                  orders: updateNoteObject,
                  ordersError: null,
                  error: false,
                });
              })
              .catch((err) => {
                this.setState({
                  loading: false,
                  ordersError: err,
                  error: true,
                });
              });
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

MyProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { MyProvider, MyContext };
