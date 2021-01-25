import React from 'react';
import Cookies from 'js-cookie';

import {
  SessionState as State,
  SessionAction as Action,
  SessionContext as Context,
} from './types';
import fetchAPI, {HeadersType} from '../../lib/fetchAPI';

type Props = {
  children: React.ReactNode,
}

const SESSION_COOKIE_NAME = 'token';

const getToken = (): string|undefined => {
  return Cookies.get(SESSION_COOKIE_NAME);
}

const setToken = (token?: string): void => {
  if (!token) {
    Cookies.remove(SESSION_COOKIE_NAME);
    return;
  }
  Cookies.set(SESSION_COOKIE_NAME, token, {
    // path: '/', sameSite: 'strict', expires: TODO,
    path: '/', sameSite: 'strict',
  });
}

const initialState = (): State => {
  const token = getToken();
  return {token, isLogin: !!token};
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default:
      return initialState();
  }
}

const Ctx = React.createContext({} as Context);

const Component: React.FC<Props> = props => {
  React.useEffect(() => {
    // fetchAPI.baseUrl = 'Your app.';

    fetchAPI.authHeaders = (): HeadersType => {
      return state.isLogin ? {'Authorization': `Bearer ${state.token}`} : {};
    }

    fetchAPI.onResponse = (res: Response): void => {
      if (res.status === 401) {
        window.location.reload();
      }
      console.log('fetchAPI.onResponse', res);
    }
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState());

  return (
    <Ctx.Provider value={{state, dispatch, getToken, setToken}}>
      {props.children}
    </Ctx.Provider>
  );
}

export const useSession = (): Context => React.useContext(Ctx);

export default Component;
