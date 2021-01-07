import React from 'react';

import {
  FlashMessageState as State,
  FlashMessageAction as Action,
  FlashMessageContext as Context,
} from './types';

type Props = {
  children: React.ReactNode,
}

const initialState = (): State => {
  return [];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return action.message ? [...state, action.message] : state;
    case 'DEL':
      if (action.idx === undefined) {
        return initialState();
      }
      return state.filter((e, i) => i !== action.idx);
    default:
      return initialState();
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

export const useFlashMessage = (): Context => React.useContext(Ctx);

export default Component;
