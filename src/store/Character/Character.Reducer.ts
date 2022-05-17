import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import type { CharacterData } from './Character.Types';
import {
  fetchCharacters,
  createCharacter,
  deleteCharacter,
  updateCharacter,
  reset,
} from './Character.Actions';
import { PURGE } from 'redux-persist';

export interface CharacterState {
  readonly characters: {
    [id: string]: CharacterData;
  };
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly message: string | undefined;
}

const initialState: CharacterState = {
  characters: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    test: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })

      .addCase(createCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.characters = { ...state.characters, ...action.payload };
      })

      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.characters = action.payload;
      })

      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        if (state.characters) {
          delete state.characters[action.payload];
        }
      })

      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.characters = { ...state.characters, ...action.payload };
      })

      .addCase(PURGE, (state) => initialState)

      .addMatcher(
        isPending(fetchCharacters, createCharacter, deleteCharacter, updateCharacter),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isRejected(fetchCharacters, createCharacter, deleteCharacter, updateCharacter),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addDefaultCase((state, action) => {});
  },
});

export const { test } = characterSlice.actions;
export default characterSlice.reducer;
