import React from 'react';

import style from './index.module.scss';
import WaitElement from '../components/WaitElement';
import {useFlashMessage} from '../ducks/flashMessage';
import {useSession} from '../ducks/session';
import fetchAPI from '../lib/fetchAPI';

const Index: React.FC<{}> = props => {
  const flash = useFlashMessage();
  const session = useSession();

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // fetchAPI.get<any>('http://httpbin.org/get', {params: {test: 'Hello'}});
    // fetchAPI.post<any>('http://httpbin.org/post', {data: JSON.stringify({test: 'World'})});
  }, [session]);

  const onClick = (): void => {
    flash.dispatch({type: 'ADD', message: {level: 'INFO', text: `Hello World ${count}!`}})
    session.dispatch({type: 'tmp'});
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  console.log('Flash.state', flash.state)
  console.log('Session.state', session.state)
  return (
    <div style={{height: '100vh'}}>
      <h1 className={style.tmp}>index!</h1>
      <button onClick={onClick}>
        TEST: {count}
      </button>
      <WaitElement />
    </div>
  );
}

export default Index;
