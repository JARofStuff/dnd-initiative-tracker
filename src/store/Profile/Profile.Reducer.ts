import { createSlice } from '@reduxjs/toolkit';
import type { ProfileData } from './Profile.Types';
import { createUserDoc, reset } from './Profile.Actions';
import { PURGE } from 'redux-persist';

interface ProfileState {
  readonly userProfile: ProfileData | null;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly message: string | undefined;
}

const initialState: ProfileState = {
  userProfile: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reset, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(createUserDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProfile = action.payload;
      })
      .addCase(createUserDoc.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(PURGE, (state) => initialState)

      .addDefaultCase((state, action) => {});
  },
});

export default profileSlice.reducer;
