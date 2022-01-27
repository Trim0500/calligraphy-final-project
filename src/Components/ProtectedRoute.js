import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({component: Component, ...restOfProps}) {
 const isAuthenticated = !!localStorage.getItem('jwtToken');
 return (
  <Route {...restOfProps} render={(props) => (
   isAuthenticated ? (
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