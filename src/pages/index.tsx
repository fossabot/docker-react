import React from 'react';

import {useSessionContext} from '../contexts/Session';
import fetchAPI from '../plugins/FetchAPI';


type Props = {}

const Index: React.FC<Props> = props => {
  const {sessionState} = useSessionContext();

  fetchAPI.baseUrl = 'http://httpbin.org';
  fetchAPI.addAuthHeadersFunc(headers => {
    headers['Authorization'] = 'Bearer ';
  });

  fetchAPI.get<any>('get', {params: {test: 'Hello'}})
    .then(console.log)
    .catch(console.error);

  fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})})
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
