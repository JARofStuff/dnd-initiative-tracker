import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import { createUserDocFromUser } from './Profile.Service';
import type { ProfileData } from './Profile.Types';

import type { UserInfo } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export enum PROFILE_ACTION_TYPES {
  SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
  CLEAR_STATE = 'profile/CLEAR_STATE',
  RESET = 'profile/RESET',
}

export const reset = createAction(PROFILE_ACTION_TYPES.RESET);
export const clearProfile = createAction(PROFILE_ACTION_TYPES.CLEAR_STATE);

export const createUserDoc = createAsyncThunk<
  ProfileData,
  UserInfo,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(PROFILE_ACTION_TYPES.SET_USER_PROFILE, async (userData, thunkAPI) => {
  try {
    const userDocSnap = await createUserDocFromUser(userData);
    const data = userDocSnap.data({ serverTimestamps: 'estimate' });

    //Make createdAt serializable
    let timestamp = data.createdAt as Timestamp;
    data.createdAt = timestamp.toJSON();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create profile.');
  }
});
