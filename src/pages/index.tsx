import React from 'react';

import {useSessionContext} from '../contexts/Session';
import FetchAPI from '../models/FetchAPI';

type Props = {}

const Index: React.FC<Props> = props => {
  const {sessionState} = useSessionContext();

  const api = new FetchAPI({
    baseUrl: 'http://httpbin.org',
    addAuthHeader: (headers: Headers) => {
      headers.append('Authorization', 'Bearer ');
    },
  });

  api.fetch<any>({
    url: 'get',
    method: 'GET',
    data: {
      test: 'Hello',
    },
  })
    .then(console.log)
    .catch(console.error);

  api.fetch<any>({
    url: 'http://httpbin.org/post',
    method: 'POST',
    data: {
      test: 'Hello',
    },
  })
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
