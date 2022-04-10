import { Dispatch } from 'react';
import { UserData } from '@root/src/utils/firebase/auth.utils';

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  SET_IS_LOADING = 'user/SET_IS_LOADING',
}

export interface ReducerAction {
  type: USER_ACTION_TYPES;
  payload?: any;
}

export interface UserState {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly dispatch?: Dispatch<ReducerAction>;
}

export const initialState: UserState = {
  currentUser: null,
  isLoading: false,
};
