import PropTypes from 'prop-types';
import React from 'react';
import { MyContext } from '../../provider/MyProvider';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import Spinner from '../ui/spinner/Spinner';
import './Auth.scss';

const Auth = ({ history }) => {
  const formElements = (
    <MyContext.Consumer>
      {(context) => {
        const value = Object.entries(
          context.state.auth
        ).map(([ key, value ]) => (
          <Input
            key={key}
            elementType={value.elementType}
            elementConfig={value.elementConfig}
            value={value.value}
            invalid={!value.valid}
            shouldValidate={value.validation}
            touched={value.touched}
            changed={(ev) => context.inputAuthDataChangedHandler(ev, key)}
          />
        ));
        return value;
      }}
    </MyContext.Consumer>
  );
  const submitButton = (
    <MyContext.Consumer>
      {(context) => (
        <Button
          btnType="success"
          title="отправить"
          classname="button"
          disabled={!context.state.formIsValid}
        />
      )}
    </MyContext.Consumer>
  );
  const signInButton = (
    <MyContext.Consumer>
      {(context) => (
        <Button
          btnType="danger"
          classname="button"
          clickSwitchAuthMode={context.switchAuthModeHandler}
          title={`переключить на ${context.state.isSignUp
            ? 'зарегистрироваться'
            : 'войти в систему'}`}
        />
      )}
    </MyContext.Consumer>
  );
  const form = (
    <MyContext.Consumer>
      {(context) =>
        context.state.loading ? (
          <Spinner />
        ) : context.state.authError ? (
          <p className="error">{context.state.authError}</p>
        ) : (
          <React.Fragment>
            <h4 className="auth__data-title">Введите Ваш email и пароль</h4>
            <form
              className="auth__data-form"
              onSubmit={(ev) =>
                context.authSubmitHandler(
                  ev,
                  context.state.auth.email.value,
                  context.state.auth.password.value,
                  context.state.isSignUp,
                  history
                )}
            >
              {formElements}
              {submitButton}
            </form>
            {signInButton}
          </React.Fragment>
        )}
    </MyContext.Consumer>
  );

  return <div className="auth__data">{form}</div>;
};

Auth.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Auth;
