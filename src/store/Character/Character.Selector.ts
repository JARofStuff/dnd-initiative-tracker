import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectCharacterReducer = (state: RootState) => state.playableCharacters;

export const selectCharacterLoading = createSelector(
  selectCharacterReducer,
  (profile) => profile.isLoading
);

export const selectCharacter = createSelector(
  selectCharacterReducer,
  (profile) => profile.character
);

export const selectCharacters = createSelector(
  selectCharacterReducer,
  (profile) => profile.characters
);
