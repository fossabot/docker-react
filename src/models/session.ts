import React from 'react';


export type SessionState = {
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
