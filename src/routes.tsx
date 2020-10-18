import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Index from './pages/index';


const AppRouter: React.FC<{}> = props => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Index} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
