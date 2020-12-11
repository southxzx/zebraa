import React from 'react';
import './App.css';
// npm i --save axios js-cookie jsonwebtoken react-facebook-login react-google-login react-router-dom react-toastify
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './features/Home';
import Product from './features/Product';
import Cart from './features/Cart';
import Search from './features/Search';
import Profile from './features/Profile';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/product' component={Product} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/search' exact component={Search} />
      <Route path='/profile' exact component={Profile}/>
      
    </Switch>
  </BrowserRouter>
  );
}

export default App;
