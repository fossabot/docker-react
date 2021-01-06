import React from 'react';

import style from './DefaultLayout.module.scss';
import Alert from '../components/Alert';
import Menu from '../components/Menu';
import {useFlashMessageContext} from '../contexts/FlashMessage';

type Props = {
  children: React.ReactNode,
}

const DefaultLayout: React.FC<Props> = props => {
  const flash = useFlashMessageContext();

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
