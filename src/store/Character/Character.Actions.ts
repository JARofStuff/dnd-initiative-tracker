import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import { DocumentReference, Timestamp } from 'firebase/firestore';
import {
  createCharacterDoc,
  getCharacterDocs,
  getCharacterDoc,
  deleteCharacterDoc,
  updateCharacterDoc,
} from './Character.Service';
import type { CharacterData } from './Character.Types';

export enum CHARACTER_ACTION_TYPES {
  FETCH_CHARACTERS = 'character/FETCH_CHARACTERS',
  GET_CHARACTER = 'character/GET_CHARACTER',
  UNSET_CHARACTER = 'character/UNSET_CHARACTER',
  CREATE_CHARACTER = 'character/CREATE_CHARACTER',
  UPDATE_CHARACTER = 'character/UPDATE_CHARACTER',
  DELETE_CHARACTER = 'character/DELETE_CHARACTER',
  RESET = 'character/RESET',
}

export const reset = createAction(CHARACTER_ACTION_TYPES.RESET);
export const unsetCharacter = createAction(CHARACTER_ACTION_TYPES.UNSET_CHARACTER);

export const fetchCharacters = createAsyncThunk<
  CharacterData[],
  string,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.FETCH_CHARACTERS, async (userId, thunkAPI) => {
  try {
    const characterDocsSnap = await getCharacterDocs(userId);
    const characterDocsArray: CharacterData[] = [];

    characterDocsSnap.forEach((doc) => {
      let data = doc.data() as CharacterData;

      //Add character doc ID for redux state
      data.id = doc.id;

      //Make createdBy serializable
      let createdByDocRef = data.createdBy as DocumentReference;
      data.createdBy = createdByDocRef.id;

      //Make createdAt serializable
      let timestamp = data.createdAt as Timestamp;
      data.createdAt = timestamp.toJSON();

      characterDocsArray.push(data);
    });

    // console.log(characterDocsArray);
    return characterDocsArray;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create character.');
  }
});

export const createCharacter = createAsyncThunk<
  string,
  { characterData: CharacterData; userId: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.CREATE_CHARACTER, async ({ characterData, userId }, thunkAPI) => {
  try {
    const characterDocSnap = await createCharacterDoc(characterData, userId);
    return characterDocSnap.id;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create character.');
  }
});

export const fetchCharacter = createAsyncThunk<
  CharacterData,
  string,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.GET_CHARACTER, async (characterId, thunkAPI) => {
  try {
    const characterDocSnap = await getCharacterDoc(characterId);

    const data = characterDocSnap.data();

    //Add character doc ID for app state
    data.id = characterDocSnap.id;

    //Make createdBy serializable
    let createdByDocRef = data.createdBy as DocumentReference;
    data.createdBy = createdByDocRef.id;

    //Make createdAt serializable
    let timestamp = data.createdAt as Timestamp;
    data.createdAt = timestamp.toJSON();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to load character.');
  }
});

export const deleteCharacter = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.DELETE_CHARACTER, async (characterId, thunkAPI) => {
  try {
    await deleteCharacterDoc(characterId);
    return characterId;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create character.');
  }
});

export const updateCharacter = createAsyncThunk<
  CharacterData,
  CharacterData,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.UPDATE_CHARACTER, async (CharacterData, thunkAPI) => {
  try {
    const characterId = CharacterData.id as string;
    const updatedCharacterData = { ...CharacterData } as any;

    //Never need to update these
    delete updatedCharacterData.id;
    delete updatedCharacterData.createdAt;
    delete updatedCharacterData.createdBy;

    const characterDocSnap = await updateCharacterDoc(characterId, updatedCharacterData);

    const data = characterDocSnap.data();
    //Add character doc ID for redux state
    data.id = characterDocSnap.id;

    //Make createdBy serializable
    let createdByDocRef = data.createdBy as DocumentReference;
    data.createdBy = createdByDocRef.id;

    //Make createdAt serializable
    let timestamp = data.createdAt as Timestamp;
    data.createdAt = timestamp.toJSON();

    return data;
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue('Unable to edit character.');
  }
});
