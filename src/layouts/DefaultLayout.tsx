import React from 'react';

import style from './DefaultLayout.module.scss';
import Alert from '../components/Alert';
import Menu from '../components/Menu';
import {useFlashMessage} from '../ducks/flashMessage';

type Props = {
  children: React.ReactNode,
}

const DefaultLayout: React.FC<Props> = props => {
  const flash = useFlashMessage();

  const messages = flash.state.map((message, idx) => {
    return <Alert key={idx} {...{idx, message}} />;
  });

  return (
    <div className={style.container}>
      <Menu />
      <div>
        <div>
          {messages}
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
