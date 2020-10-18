import React from 'react';
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';


export const LoginRequiredRoute: React.FC<any> = props => {
  const newProps = {...props};
  const Component = props.component;
  delete newProps.component;

  const render = (routeProps: RouteComponentProps) => {
    const isLogin = true;  // TODO
    if (!isLogin) {
      const params = new URLSearchParams();
      params.append('next', props.path);
      return <Redirect to={{
        pathname: '/login',
        search: params.toString(),
        state: {from: routeProps.location},
      }} />;
    }
    return <Component {...routeProps} />;
  }

  return <Route {...newProps} render={render} />;
}
