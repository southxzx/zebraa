import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/Detail';
import MainPage from './pages/Main';

function Product(props) {
    const match = useRouteMatch();
    // console.log({ match });

    return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route path={`${match.url}/:slug/:_idProduct/:_idColorProduct`} component={DetailPage} />

    </Switch>
    );
}

export default Product;