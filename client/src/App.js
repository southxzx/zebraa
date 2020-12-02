import React from 'react';
import './App.css';
// npm i --save axios js-cookie jsonwebtoken react-facebook-login react-google-login react-router-dom react-toastify
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './features/Home';


function App() {
  return (
    <BrowserRouter>
    <Switch>
      
      <Route path='/' exact component={Home} />
      
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
