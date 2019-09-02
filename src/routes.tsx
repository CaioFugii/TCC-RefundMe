import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Login from "./views/Login";
import RedirectComponent from "./components/redirect";
import { useSelector } from "react-redux";
import { ApplicationState } from "./models";
import { AppReducerState } from "./store/ducks/app/types";
import { Alert, Loader, Header } from "./components";
import ExpensesRefunds from "./views/ExpensesRefunds";

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state: ApplicationState) => state.login);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <>
            <Header />
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes: React.FC = () => {
  const appStore: AppReducerState = useSelector(
    (state: ApplicationState) => state.app
  );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/expenses-refunds" component={ExpensesRefunds} />
          <Route component={RedirectComponent} />
        </Switch>
      </BrowserRouter>
      <Loader visible={appStore.showLoader} />
      <Alert
        className={appStore.alertClass ? appStore.alertClass : undefined}
        visible={appStore.showAlert}
        text={appStore.alertText}
      />
    </>
  );
};

export default Routes;
