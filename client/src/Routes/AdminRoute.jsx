import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth, isAuthorized } from "../helpers/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
    const [state, setState] = useState('loading');

    useEffect(() => {
        const ga = async() => {
            try {
              /* Update effect logic to track correct state */
              const isLogged = await isAuthorized();
              setState(isLogged ? 'true' : 'redirect');
            }
            catch {
              setState('redirect');
            }
        };

        ga();
    },[])

    /* If in loading state, return loading message while waiting for 
    isValidToken to complete */
    if(state === 'loading') {
        return <div>Loading..</div>
    }

    return (
        <Route
          
          {...rest}
          
          render={props => ((state === 'true') ? 
            <Component {...props} /> : 
            <Redirect to={{
                pathname: '/products',
                state: { from: props.location }
            }} />) }
        />
      );


};

export default AdminRoute;
