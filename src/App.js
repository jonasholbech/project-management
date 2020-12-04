import React, {useEffect} from "react";
import { Button } from 'rsuite';
import { StateProvider } from "./models/store.js";
//import Overview from "./components/Overview";

//import Task from "./components/Task";
import Loader from "./components/Loader";

import netlifyIdentity from 'netlify-identity-widget';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import "./App.css";
const Overview = React.lazy(()=>import("./components/Overview"));
const Task = React.lazy(()=>import("./components/Task"));
const AddTask = React.lazy(()=>import("./components/AddTask"));

function App() {
  useEffect(()=>{
    console.log(
      Boolean(netlifyIdentity.currentUser())
    )
    },[])
  return (
    <div className="App">
      <StateProvider>
        <React.Suspense fallback={<span>Waiting</span>}>
          <Router>
            <nav>
              <AuthButton />
              <Link to="/public">Public Page</Link>
              <Link to="/protected">Protected</Link>
              <Link to="/overview">Overview</Link>
              <Link to="/add-task">Add Task</Link>
            </nav>
            <main>
              <Switch>
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Protected} />
                <PrivateRoute exact path="/overview" component={Overview} />
                <PrivateRoute path="/overview/:id" component={Task} />
                <PrivateRoute path="/add-task" component={AddTask} />
              </Switch>
            </main>
          </Router>          
          </React.Suspense>
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
      
        <Button appearance="subtle"
          onClick={() => {
            netlifyAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </Button>
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
        <Button appearance="primary" onClick={this.login}>Log in</Button>
      </div>
    );
  }
}

export default App;
