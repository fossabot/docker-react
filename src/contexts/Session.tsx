import {cloneDeep} from 'lodash';
import React from 'react';

import {
  SessionState as State,
  SessionAction as Action,
  SessionContext as Context,
} from '../models/session';


type Props = {
  children: React.ReactNode,
}

const initialState = (): State => {
  return {
    isLogin: false,
  }
}

const reducer = (state: State, action: Action): State => {
  const newState = cloneDeep(state);
  // switch (action.type) {
  // }
  console.log(newState)
  return newState;
}

const Ctx = React.createContext({} as Context);

const Session: React.FC<Props> = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState());

  return (
    <Ctx.Provider value={{state, dispatch}}>
      {props.children}
    </Ctx.Provider>
  );
}

export const useSessionContext = (): Context => React.useContext(Ctx);

export default Session;
