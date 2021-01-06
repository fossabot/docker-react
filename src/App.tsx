import React from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import FlashMessage from './contexts/FlashMessage';
import Session from './contexts/Session';
import Variables from './contexts/Variables';
import AppRouter from './routes';

const contexts = [
  ErrorBoundary,
  Variables,
  FlashMessage,
  Session,
];

const App: React.FC<{}> = props => {
  let node: React.ReactNode = <AppRouter />;
  for (let i = contexts.length; 0 < i; i--) {
    node = React.createElement(contexts[i-1], null, node);
  }
  return <React.StrictMode>{node}</React.StrictMode>;
}

export default App;
