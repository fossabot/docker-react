import React from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import FlashMessage from './contexts/FlashMessage';
import Session from './contexts/Session';
import AppRouter from './routes';


const App: React.FC<{}> = props => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <FlashMessage>
          <Session>
            <AppRouter />
          </Session>
        </FlashMessage>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
