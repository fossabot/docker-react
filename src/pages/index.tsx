import React from 'react';

import style from './index.module.scss';
import {useFlashMessageContext} from '../contexts/FlashMessage';
import {useSessionContext} from '../contexts/Session';
import WaitElement from '../components/WaitElement';
import fetchAPI from '../plugins/FetchAPI';


const Index: React.FC<{}> = props => {
  const flash = useFlashMessageContext();
  const session = useSessionContext();

  const [count, setCount] = React.useState(0);
  const [tmp, setTmp] = React.useState(null as any);

  fetchAPI.baseUrl = 'http://httpbin.org';
  fetchAPI.authHeaders = () => {
    return {'Authorization': 'Bearer '}
  }
  fetchAPI.onResponse = res => {
    console.log('fetchAPI.onResponse', res);
  }
  fetchAPI.onError = err => {
    console.log('fetchAPI.onError', err)
  }

  React.useEffect(() => {
    // fetchAPI.get<any>('get', {params: {test: 'Hello'}}).then(setTmp);
    // fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})})
    //   .then(console.log);
  }, [setTmp]);

  const onClick = (): void => {
    session.dispatch({type: 'test'});
    flash.dispatch({type: 'ADD', message: {level: 'INFO', text: `Hello World ${count}!`}})
    setCount(count + 1);
  }

  console.log(session.state)
  console.log(flash.state)
  console.log(tmp)
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
