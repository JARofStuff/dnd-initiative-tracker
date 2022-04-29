import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectProfileReducer = (state: RootState) => state.profile;
export const selectProfile = createSelector(selectProfileReducer, (profile) => profile.userProfile);
