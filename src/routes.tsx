import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import R from './components/CustomRouter';
import BlackLayout from './layouts/BlackLayout';
import Index from './pages/index';


const AppRouter: React.FC<{}> = props => {
  return (
    <Router>
      <Switch>
        <R exact path='/' component={Index} noLogin />
        <R exact path='/err' component={Index} />
        <R exact path='/null' />
        <R component={Index} layout={BlackLayout} noLogin />
      </Switch>
    </Router>
  );
}

export default AppRouter;
