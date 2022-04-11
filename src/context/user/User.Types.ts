export enum USER_ACTION_TYPES {
  FETCH_USERS = 'user/FETCH_USERS',
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  SET_LOADING = 'user/SET_LOADING',
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
}
