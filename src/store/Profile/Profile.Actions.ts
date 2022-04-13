import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import { createUserDocFromUser, ProfileData } from './Profile.Service';
import { UserInfo, AuthError, AuthErrorCodes } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export enum PROFILE_ACTION_TYPES {
  CREATE_USER_DOC = 'profile/CREATE_USER_DOC',
  // SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
  RESET = 'profile/RESET',
}

// export const setUserProfile = createAction(
//   AUTH_ACTION_TYPES.SET_USER_PROFILE,
//   (user: UserInfo) => ({
//     payload: user,
//   })
// );

export const reset = createAction(PROFILE_ACTION_TYPES.RESET);

export const createUserDoc = createAsyncThunk<
  ProfileData,
  UserInfo,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(PROFILE_ACTION_TYPES.CREATE_USER_DOC, async (userData, thunkAPI) => {
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
