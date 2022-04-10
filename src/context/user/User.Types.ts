import { Dispatch } from 'react';

export enum USER_ACTION_TYPES {
  GET_USERS = 'user/GET_USERS',
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  SET_IS_LOADING = 'user/SET_IS_LOADING',
}

export interface ReducerAction {
  type: USER_ACTION_TYPES;
  payload?: any;
}

export interface UserData {
  displayName: string;
  email: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface UserState {
  readonly users: UserData[] | null;
  readonly currentUser: UserData | null;
  readonly loading: boolean;
  readonly dispatch?: Dispatch<ReducerAction>;
}

export const initialState: UserState = {
  users: null,
  currentUser: null,
  loading: false,
};
