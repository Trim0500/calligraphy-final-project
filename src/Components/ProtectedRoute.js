import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({component: Component, ...restOfProps}) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
 return (
  <Route {...restOfProps} render={(props) => (
      isLoggedIn ? (
    <Component {...props} />
   ) : (
    <Redirect to={{
     pathname: '/admin/login',
     state: {from: props.location}
    }} />
   )
  )} />
 );
}

export default ProtectedRoute;