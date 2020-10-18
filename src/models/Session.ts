import React from 'react';


export type SessionState = {
  isLogin: boolean
}

export type SessionAction = {
  type: string,
}

export type SessionContext = {
  sessionState: SessionState,
  sessionDispatch: React.Dispatch<SessionAction>,
}
