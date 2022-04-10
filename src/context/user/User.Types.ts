import { Dispatch } from 'react'
import { UserData } from '@utils/firebase/firebase.utils'

export enum USER_ACTION_TYPES {
  SET_CURRENTUSER = 'user/SET_CURRENTUSER',
}

export type ReducerAction = {
  type: USER_ACTION_TYPES
  payload?: any
}

export type UserState = {
  readonly currentUser: UserData | null
  readonly dispatch: Dispatch<ReducerAction>
}

export const initialState: UserState = {
  currentUser: null,
  dispatch: () => null,
}
