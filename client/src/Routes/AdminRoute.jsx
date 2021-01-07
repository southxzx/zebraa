import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth, isAuthorized } from '../helpers/auth';

const AdminRoute = ({ component: Component, ...rest }) => (
    
    <Route
        {...rest}
        render = { function (props){
            let x = isAuthorized();
            x.then(function(result){        // resolve promise pending
                return result == 'admin' ? (
                    <Component {...props} />
                    //console.log(result)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                    
                    //console.log(result)
                )
            })
        }
           
        }

        
        // render={props =>
        //     isAuthorized() == 'admin' ? (
        //         <Component {...props} />
        //     ) : (
        //         // <Redirect
        //         //     to={{
        //         //         pathname: '/login',
        //         //         state: { from: props.location }
        //         //     }}
        //         // />
        //         let x = await isAuthorized()
        //         //console.log(isAuthorized())
        //     )
        // }
    ></Route>
);

export default AdminRoute;