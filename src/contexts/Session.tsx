import React, {createContext, useContext, useReducer} from 'react';

import {SessionState, SessionAction, SessionContext} from '../models/session';


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
  console.log(state)
  return state;
}

const Context = createContext({} as SessionContext);

const Session: React.FC<Props> = props => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <Context.Provider value={{state, dispatch}}>
      {props.children}
    </Context.Provider>
  );
}

export const useSessionContext = (): SessionContext => useContext(Context);

export default Session;
