import React from 'react';

import style from './index.module.scss';
import {useSessionContext} from '../contexts/Session';
import WaitElement from '../components/WaitElement';
import fetchAPI from '../plugins/FetchAPI';


const Index: React.FC<{}> = props => {
  const session = useSessionContext();

  fetchAPI.baseUrl = 'http://httpbin.org';
  fetchAPI.addAuthHeadersFunc(headers => {
    headers['Authorization'] = 'Bearer ';
  });

  React.useEffect(() => {
    // fetchAPI.get<any>('get', {params: {test: 'Hello'}})
    //   .then(console.log)
    //   .catch(console.error);
    // fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})})
    //   .then(console.log)
    //   .catch(console.error);
  });

  const onClick = (): void => {
    session.dispatch({type: 'test'});
  }

  return (
    <div style={{height: '100vh'}}>
      <h1 className={style.tmp}>index!</h1>
      <p>{session.state.isLogin ? 'login' : 'no login'}</p>
      <button onClick={onClick}>
        TEST
      </button>
      <WaitElement />
    </div>
  );
}

export default Index;
