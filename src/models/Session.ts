import React from 'react';

import {FetchAPI} from './fetchAPI';


export type SessionState = {
  api: FetchAPI,
  isLogin: boolean,
}

export type SessionAction = {
  type: 'SET_TOKEN' | 'DEL_TOKEN',
  token?: string,
}

export type SessionContext = {
  state: SessionState,
  dispatch: React.Dispatch<SessionAction>,
}
