import React from 'react';
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';


export const LoginRequiredRoute: React.FC<any> = props => {
  const newProps = {...props};
  const Component = props.component;
  const Layout = props.layout;
  delete newProps.component;
  delete newProps.layout;

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
    return (
      <Layout>
        <Component {...routeProps} />
      </Layout>
    );
  }

  return <Route {...newProps} render={render} />;
}
