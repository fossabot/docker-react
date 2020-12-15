import React from 'react';

import style from './DefaultLayout.module.scss';
import Menu from '../components/Menu';


type Props = {
  children: React.ReactNode,
}

const DefaultLayout: React.FC<Props> = props => {
  return (
    <div className={style.container}>
      <Menu />
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
