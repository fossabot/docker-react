import React from 'react';

import Session from './contexts/Session';
import AppRouter from './routes';

const App: React.FC<{}> = props => {
  return (
    <React.StrictMode>
      <Session>
        <AppRouter />
      </Session>
    </React.StrictMode>
  );
}

export default App;
