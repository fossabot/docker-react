import React from 'react';

import {useSessionContext} from '../contexts/Session';
import FetchAPI from '../models/FetchAPI';

type Props = {}

const Index: React.FC<Props> = props => {
  const {sessionState} = useSessionContext();

  const api = new FetchAPI();
  api.build({
    url: 'http://httpbin.org/get',
    method: 'GET',
    data: {
      test: 'Hello',
    },
  });
  api.fetch<any>()
    .then(console.log)
    .catch(console.error);

  return (
    <div>
      <h1>index!</h1>
      <p>{sessionState.isLogin ? 'login' : 'no login'}</p>
    </div>
  );
}

export default Index;
