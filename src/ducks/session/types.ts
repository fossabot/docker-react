import React from 'react';

export type GetToken = () => string|undefined;

export type SetToken = (token?: string) => void;

export type SessionState = {
  isLogin: boolean,
  token?: string,
}

export type SessionAction = {
  type: string,
}

export type SessionContext = {
  state: SessionState,
  dispatch: React.Dispatch<SessionAction>,
  getToken: GetToken,
  setToken: SetToken,
}
