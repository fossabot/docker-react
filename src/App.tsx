import React from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import FlashMessage from './ducks/flashMessage';
import Session from './ducks/session';
import AppRouter from './routes';

const contexts = [
  ErrorBoundary,
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
