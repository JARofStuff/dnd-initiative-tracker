import { createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import type { CharacterData } from './Character.Types';
import {
  fetchCharacters,
  fetchCharacter,
  createCharacter,
  unsetCharacter,
  deleteCharacter,
  updateCharacter,
  reset,
} from './Character.Actions';

export interface CharacterState {
  readonly characters: CharacterData[] | null;
  readonly character: CharacterData | null;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly message: string | undefined;
}

const initialState: CharacterState = {
  characters: null,
  character: null,
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

      .addCase(unsetCharacter, (state) => {
        state.character = null;
      })

      .addCase(createCharacter.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Character Created';
      })

      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.characters = action.payload;
      })

      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.character = action.payload;
      })

      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Character Deleted';

        if (state.characters) {
          const newCharacterArray = state.characters.filter(
            (character) => character.id !== action.payload
          );

          state.characters = newCharacterArray.length === 0 ? null : newCharacterArray;
        }
      })

      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.character = action.payload;
      })

      .addMatcher(
        isPending(
          fetchCharacters,
          fetchCharacter,
          createCharacter,
          deleteCharacter,
          updateCharacter
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isRejected(
          fetchCharacters,
          fetchCharacter,
          createCharacter,
          deleteCharacter,
          updateCharacter
        ),
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
