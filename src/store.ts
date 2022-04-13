import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/Auth/Auth.Reducer';
import profileReducer from '@store/Profile/Profile.Reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
