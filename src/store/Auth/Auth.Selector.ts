import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
// import { TypedUseSelectorHook,  } from 'react-redux';

export const selectAuthReducer = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(selectAuthReducer, (user) => user.currentUser);

export const selectAuthLoading = createSelector(selectAuthReducer, (user) => user.isLoading);
