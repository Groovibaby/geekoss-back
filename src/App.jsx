import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Offers from './components/Offers/Offers';
import Users from './components/Users/Users';
import Admins from './components/Admins/Admins';

function App() {
  return (
    <>
    {/* <AuthProvider> */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
      <Switch>
        <Route exact path="/admin" component={Welcome} />
        {/* <PrivateRoute exact path="/admin" component={Welcome} /> */}
      </Switch>
      <Switch>
        <Route exact path="/admin/admins" component={Admins} />
      </Switch>
      <Switch>
        <Route exact path="/admin/offers" component={Offers} />
      </Switch>
      <Switch>
        <Route exact path="/admin/users" component={Users} />
      </Switch>
    {/* </AuthProvider> */}
    </>
  );
}

export default App;
