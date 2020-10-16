import React from 'react';

import {useSessionContext} from '../contexts/Session';

type Props = {}

const Index: React.FC<Props> = props => {
  const {sessionState} = useSessionContext();

  return (
    <div>
      <h1>index!</h1>
      <p>{sessionState.isLogin ? 'login' : 'no login'}</p>
    </div>
  );
}

export default Index;
