import React from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import Session from './contexts/Session';
import AppRouter from './routes';


const App: React.FC<{}> = props => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Session>
          <AppRouter />
        </Session>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
