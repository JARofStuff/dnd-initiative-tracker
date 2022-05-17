import { createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  setCurrentUser,
  // googleSignIn,
  reset,
} from './Auth.Actions';

import { PURGE } from 'redux-persist';

import type { UserInfo } from 'firebase/auth';

interface AuthState {
  readonly currentUser: UserInfo | null;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly message: string | undefined;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// const authAdapter = createEntityAdapter<AuthState>();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUser, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(reset, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.isLoading = false;
      })

      .addCase(PURGE, (state) => initialState)

      .addMatcher(isPending(register, login, logout), (state) => {
        state.isLoading = true;
      })

      .addMatcher(isRejected(register, login), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addMatcher(isFulfilled(register, login), (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addDefaultCase((state, action) => {});
  },
});

export default authSlice.reducer;
