import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {LoginRequiredRoute} from './components/CustomRouter';
import Black from './layouts/Black';
import White from './layouts/White';
import Index from './pages/index';


const AppRouter: React.FC<{}> = props => {
  return (
    <Router>
      <Switch>
        <LoginRequiredRoute exact layout={White} path='/' component={Index} />
        <LoginRequiredRoute exact layout={Black} path='/black' component={Index} />
        <Route component={Index} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
