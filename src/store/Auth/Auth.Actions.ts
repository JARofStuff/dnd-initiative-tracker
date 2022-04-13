import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import {
  signUpWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
} from './Auth.Service';
import { UserInfo, AuthError, AuthErrorCodes } from 'firebase/auth';

export enum AUTH_ACTION_TYPES {
  EMAIL_REGISTER = 'user/REGISTER',
  EMAIL_SIGNIN = 'user/EMAIL_SIGNIN',
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',

  LOGOUT = 'user/LOGOUT',
  RESET = 'user/RESET',
}

export const setCurrentUser = createAction(
  AUTH_ACTION_TYPES.SET_CURRENT_USER,
  (user: UserInfo) => ({
    payload: user,
  })
);
export const reset = createAction(AUTH_ACTION_TYPES.RESET);
export const logout = createAsyncThunk(AUTH_ACTION_TYPES.LOGOUT, async () => {
  await signOutUser();
});

export const register = createAsyncThunk<
  UserInfo,
  { email: string; password: string; displayName: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(AUTH_ACTION_TYPES.EMAIL_REGISTER, async (userLoginInfo, thunkAPI) => {
  try {
    const { email, password, displayName } = userLoginInfo;
    const user = await signUpWithEmailAndPassword(email, password, displayName);
    return user.providerData[0];
  } catch (error) {
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      return thunkAPI.rejectWithValue('Email already in use.');
    } else {
      return thunkAPI.rejectWithValue('Unable to create a new account.');
    }
  }
});

export const login = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(AUTH_ACTION_TYPES.EMAIL_SIGNIN, async (userLoginInfo, thunkAPI) => {
  try {
    const { email, password } = userLoginInfo;
    const user = await signInAuthUserWithEmailAndPassword(email, password);
    return user.providerData[0];
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to sign in. Please try again.');
  }
});
