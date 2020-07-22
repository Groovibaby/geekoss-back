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
import CarouselGeekoss from './components/Carousel/CarouselGeekoss';
import AddBanners from './components/Carousel/AddBanners';
import UpdateBanners from './components/Carousel/UpdateBanners';

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/admin" component={Welcome} />
        <PrivateRoute exact path="/admin/admins" component={Admins} />
        <PrivateRoute exact path="/admin/offers" component={Offers} />
        <PrivateRoute exact path="/admin/users" component={Users} />
        <PrivateRoute exact path="/admin/carousels" component={CarouselGeekoss} />
        <PrivateRoute exact path="/admin/carousels/add-banners" component={AddBanners} />
        <PrivateRoute exact path="/admin/carousels/update-banners/:id" component={UpdateBanners} />
      </Switch>
    </AuthProvider>
    </>
  );
}

export default App;
