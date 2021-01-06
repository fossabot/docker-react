import React from 'react';

import style from './index.module.scss';
import {useFlashMessageContext} from '../../contexts/FlashMessage';
import {FlashMessage} from '../../models/flashMessage';

type Props = {
  idx: number,
  message: FlashMessage,
}

const level2style = (level: string): string => {
  switch (level) {
    case 'SUCCESS': return style.success;
    case 'WARNING': return style.warning;
    case 'ERROR': return style.error;
    default: return style.info;
  }
}

const Alert: React.FC<Props> = props => {
  const flash = useFlashMessageContext();

  const classNames = [style.box, level2style(props.message.level)].join(' ');

  const del = (): void => {
    flash.dispatch({type: 'DEL', idx: props.idx});
  }

  return (
    <div className={classNames} role='alert'>
      {props.message.text}
      <button type='button' className={style.close} onClick={del}>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
}

export default Alert;
