import React from 'react';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';


type Props = RouteProps & {
  layout?: React.ComponentType<any>,
  noLogin?: boolean,
}

const CustomRouter: React.FC<Props> = props => {
  const {component, layout, noLogin, ...rprops} = props;
  if (component === undefined) {
    return null;
  }

  const render = (routeProps: RouteComponentProps) => {
    const params = new URLSearchParams();
    if (props.path && props.path === 'string') {
      params.append('next', props.path);
    }
    if (!noLogin) {
      return <Redirect to={{
        pathname: '/login',
        search: params.toString(),
        state: {from: routeProps.location},
      }} />;
    }
    return React.createElement(
      layout ?? DefaultLayout,
      null,
      React.createElement(component, routeProps),
    );
  }

  return <Route {...rprops} render={render} />;
}

export default CustomRouter;
