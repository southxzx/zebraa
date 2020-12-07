import React from 'react';
import './App.css';
// npm i --save axios js-cookie jsonwebtoken react-facebook-login react-google-login react-router-dom react-toastify
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './features/Home';
import Cart from './features/Cart';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      
      <Route path='/' exact component={Home} />
      <Route path='/cart' exact component={Cart} />
      
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
