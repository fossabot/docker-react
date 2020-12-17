import React from 'react';
import Cookies from 'js-cookie'

import {
  SessionState as State,
  SessionAction as Action,
  SessionContext as Context,
} from '../models/session';
import {FetchAPI, HeadersType} from '../models/fetchAPI';


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

const Ctx = React.createContext({} as Context);

const Session: React.FC<Props> = props => {
  const initialState = (): State => {
    const fetchAPI = new FetchAPI();
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
    fetchAPI.onError = (err: Error): void => {
      console.log('fetchAPI.onError', err)
    }

    const token = getSessionCookie();
    return {
      api: fetchAPI,
      isLogin: !!token,
    }
  }

  const [state, dispatch] = React.useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'SET_TOKEN':
          setSessionCookie(action.token);
          break;
        case 'DEL_TOKEN':
          setSessionCookie();
          break;
      }
      return state;
    },
    initialState(),
  );

  return (
    <Ctx.Provider value={{state, dispatch}}>
      {props.children}
    </Ctx.Provider>
  );
}

export const useSessionContext = (): Context => React.useContext(Ctx);

export default Session;
