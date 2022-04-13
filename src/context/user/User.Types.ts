export enum USER_ACTION_TYPES {
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
  readonly currentUser: UserData | null;
  readonly loading: boolean;
}
