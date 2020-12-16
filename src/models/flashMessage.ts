import React from 'react';

export type FlashMessage = {
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR',
  text: React.ReactNode,
}

export type FlashMessageState = FlashMessage[];

export type FlashMessageAction = {
  type: string,
  idx?: number,
  message?: FlashMessage,
}

export type FlashMessageContext = {
  state: FlashMessageState,
  dispatch: React.Dispatch<FlashMessageAction>,
}

export enum level {
  FETCH_API_ERROR = 'FETCH_API_ERROR',
  RESPONSE_PARSE_ERROR = 'RESPONSE_PARSE_ERROR',
}
