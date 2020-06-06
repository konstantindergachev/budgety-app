import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.scss';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import SideDrawer from './components/header/sidedrawer/SideDrawer';
import Toolbar from './components/header/toolbar/Toolbar';
import Spinner from './components/ui/spinner/Spinner';
import { MyContext } from './provider/MyProvider';

const Auth = lazy(() => import('./components/auth/Auth'));
const Statistics = lazy(() => import('./components/statistics/Statistics'));
const Logout = lazy(() => import('./components/auth/logout/Logout'));
const ErrorHandler = lazy(() =>
  import('./components/errorhandler/ErrorHandler')
);

class App extends Component {
  state = { showSideDrawer: false };
  componentDidMount() {
    this.props.context.authCheckState();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.context.state.token !== null) {
      return this.props.context.state.token;
    }
  };
  sideDrawerToggleHandler = () => {
    const prevState = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !prevState });
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <Toolbar
            drawerToggleClicked={this.sideDrawerToggleHandler}
            getToken={this.componentDidUpdate(this.props)}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerCloseHandler}
            getToken={this.componentDidUpdate(this.props)}
          />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Content {...props} />}
              />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route
                path="/statistics"
                render={(props) => <Statistics {...props} />}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <Logout
                    clickedLogOut={this.props.context.authLogOut}
                    {...props}
                  />
                )}
              />
              <Route render={(props) => <ErrorHandler {...props} />} />
            </Switch>
          </Suspense>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(
  React.forwardRef((props, ref) => (
    <MyContext.Consumer>
      {(context) => <App {...props} context={context} />}
    </MyContext.Consumer>
  ))
);
