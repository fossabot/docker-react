import React from 'react';

import style from './index.module.scss';
import {useFlashMessageContext} from '../contexts/FlashMessage';
import {useSessionContext} from '../contexts/Session';
import WaitElement from '../components/WaitElement';
import fetchAPI from '../models/fetchAPI';


const Index: React.FC<{}> = props => {
  const flash = useFlashMessageContext();
  const session = useSessionContext();

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    fetchAPI.get<any>('http://httpbin.org/get', {params: {test: 'Hello'}});
    // fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})});
  }, [session]);

  const onClick = (): void => {
    session.dispatch({type: 'SET_TOKEN', token: 'test'});
    flash.dispatch({type: 'ADD', message: {level: 'INFO', text: `Hello World ${count}!`}})
    setCount(count + 1);
  }

  console.log('Session.state', session.state)
  console.log('Flash.state', flash.state)
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
