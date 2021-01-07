import React from 'react';

export type FlashMessage = {
  level: 'INFO'|'SUCCESS'|'WARNING'|'ERROR',
  text: React.ReactNode,
}

export type FlashMessageState = FlashMessage[];

export type FlashMessageAction = {
  type: 'ADD'|'DEL',
  idx?: number,
  message?: FlashMessage,
}

export type FlashMessageContext = {
  state: FlashMessageState,
  dispatch: React.Dispatch<FlashMessageAction>,
}
