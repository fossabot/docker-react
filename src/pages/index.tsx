import React from 'react';

import style from './index.module.scss';
import {useSessionContext} from '../contexts/Session';
import fetchAPI from '../plugins/FetchAPI';


const Index: React.FC<{}> = props => {
  const session = useSessionContext();

  const [init, setInit] = React.useState(true);

  fetchAPI.baseUrl = 'http://httpbin.org';
  fetchAPI.addAuthHeadersFunc(headers => {
    headers['Authorization'] = 'Bearer ';
  });

  React.useEffect(() => {
    console.log('Run only for the first time', init);
    // fetchAPI.get<any>('get', {params: {test: 'Hello'}})
    //   .then(console.log)
    //   .catch(console.error);
    // fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})})
    //   .then(console.log)
    //   .catch(console.error);
    setInit(false);
  }, [init]);

  const onClick = (): void => {
    session.dispatch({type: 'test'});
  }

  return (
    <div>
      <h1 className={style.tmp}>index!</h1>
      <p>{session.state.isLogin ? 'login' : 'no login'}</p>
      <button onClick={onClick}>
        TEST
      </button>
    </div>
  );
}

export default Index;
