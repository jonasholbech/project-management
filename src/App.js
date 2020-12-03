import React, {useEffect} from "react";
import { StateProvider } from "./models/store.js";
import Overview from "./components/Overview";
import Task from "./components/Task";
import Loader from "./components/Loader";

import netlifyIdentity from 'netlify-identity-widget';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import "./App.css";

function App() {
  useEffect(()=>{
    console.log(
      Boolean(netlifyIdentity.currentUser())
    )
    },[])
  return (
    <div className="App">
      <StateProvider>
          <Router>
            <nav>
              <AuthButton />
              <Link to="/public">Public Page</Link>
              <Link to="/protected">Protected</Link>
              <Link to="/overview">Overview</Link>
            </nav>
            <main>
              <Route path="/public" component={Public} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/protected" component={Protected} />
              <PrivateRoute exact path="/overview" component={Overview} />
              <PrivateRoute path="/overview/:id" component={Task} />
            </main>
          </Router>          
      </StateProvider>
    </div>
  );
}
function Public() {
  return <h3>Public</h3>;
}
function Protected() {
  const user = netlifyIdentity.currentUser();
  console.log({ user });
  return (
    <div>
      <h3>Protected Page</h3>
      You are logged in as <b>{user.email}</b>
    </div>
  );
}

const netlifyAuth = {
  isAuthenticated: Boolean(netlifyIdentity.currentUser()),
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  }
};

const AuthButton = withRouter(
  ({ history }) =>
  Boolean(netlifyIdentity.currentUser()) ? (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            netlifyAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Boolean(netlifyIdentity.currentUser()) ? (
          <Loader>
            <Component {...props} />
          </Loader>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default App;
