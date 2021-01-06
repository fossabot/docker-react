import React from 'react';
import Cookies from 'js-cookie'

import fetchAPI, {HeadersType} from '../models/fetchAPI';
import {
  SessionState as State,
  SessionAction as Action,
  SessionContext as Context,
} from '../models/session';

type Props = {
  children: React.ReactNode,
}

const SESSION_COOKIE = 'token';

const setSessionCookie = (token?: string): void => {
  if (!token) {
    Cookies.remove(SESSION_COOKIE);
    return;
  }
  Cookies.set(SESSION_COOKIE, token, {
    // path: '/', sameSite: 'strict', expires: TODO,
    path: '/', sameSite: 'strict',
  });
}

const getSessionCookie = (): string|undefined => {
  return Cookies.get(SESSION_COOKIE);
}

const initialState = (): State => {
  const token = getSessionCookie();
  return {
    isLogin: !!token,
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TOKEN':
      setSessionCookie(action.token);
      break;
    case 'DEL_TOKEN':
      setSessionCookie();
      break;
  }
  return initialState();
}

const Ctx = React.createContext({} as Context);

const Component: React.FC<Props> = props => {
  React.useLayoutEffect(() => {
    // fetchAPI.baseUrl = 'Your app.';
    fetchAPI.authHeaders = (): HeadersType => {
      const token = getSessionCookie();
      return token ? {'Authorization': `Bearer ${token}`} : {}
    }
    fetchAPI.onResponse = (res: Response): void => {
      if (res.status === 401) {
        dispatch({type: 'DEL_TOKEN'});
        window.location.reload();
      }
      console.log('fetchAPI.onResponse', res);
    }
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState());

  return (
    <Ctx.Provider value={{state, dispatch}}>
      {props.children}
    </Ctx.Provider>
  );
}

export const useSessionContext = (): Context => React.useContext(Ctx);

export default Component;
