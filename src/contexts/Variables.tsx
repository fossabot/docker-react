import React from 'react';

import {
  VariablesState as State,
  VariablesAction as Action,
  VariablesContext as Context,
} from '../models/variables';

type Props = {
  children: React.ReactNode,
}

const initialState = (): State => {
  switch (process.env.REACT_APP_ENV) {
    default:
      return {env: 'development'}
  }
}

const reducer = (state: State, action: Action): State => {
  const ns = {...state}
  switch (action.type) {
    case 'SET':
      Object.keys(action.value).forEach((k: string) => {
        ns[k] = action.value[k];
      });
      return ns;
    case 'DEL':
      Object.keys(action.value).forEach((k: string) => {
        delete ns[k];
      });
      return ns;
    default:
      return state;
  }
}

const Ctx = React.createContext({} as Context);

const Component: React.FC<Props> = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState());

  return (
    <Ctx.Provider value={{state, dispatch}}>
      {props.children}
    </Ctx.Provider>
  );
}

export const useVariablesContext = (): Context => React.useContext(Ctx);

export default Component;
