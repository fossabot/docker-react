import React from 'react';

export type VariablesState = Record<string, any> & {
  env?: string,
  test?: string,
}

export type VariablesAction = {
  type: 'SET' | 'DEL',
  value: VariablesState,
}

export type VariablesContext = {
  state: VariablesState,
  dispatch: React.Dispatch<VariablesAction>,
}
