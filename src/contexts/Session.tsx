import React, {createContext, useContext, useReducer} from 'react';

import {SessionState, SessionAction, SessionContext} from '../types/Session';

type Props = {
  children: React.ReactNode,
}

const initialState = (): SessionState => {
  return {
    isLogin: false,
  }
}

const reducer = (state: SessionState, action: SessionAction): SessionState => {
  // switch (action.type) {
  // }
  return state;
}

const Context = createContext({} as SessionContext);

const Session: React.FC<Props> = props => {
  const [sessionState, sessionDispatch] = useReducer(reducer, initialState());

  return (
    <Context.Provider value={{sessionState, sessionDispatch}}>
      {props.children}
    </Context.Provider>
  );
}

export const useSessionContext = (): SessionContext => useContext(Context);

export default Session;
