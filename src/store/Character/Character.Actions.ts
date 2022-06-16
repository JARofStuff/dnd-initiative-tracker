import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import { DocumentReference, Timestamp } from 'firebase/firestore';
import {
  createCharacterDoc,
  getCharacterDocs,
  deleteCharacterDoc,
  updateCharacterDoc,
} from './Character.Service';
import type { CharacterData } from './Character.Types';

export enum CHARACTER_ACTION_TYPES {
  FETCH_CHARACTERS = 'character/FETCH_CHARACTERS',
  CREATE_CHARACTER = 'character/CREATE_CHARACTER',
  UPDATE_CHARACTER = 'character/UPDATE_CHARACTER',
  RESET = 'character/RESET',
  DELETE_CHARACTER = 'character/DELETE_CHARACTER',
  CLEAR_STATE = 'character/CLEAR_STATE',
}

export const reset = createAction(CHARACTER_ACTION_TYPES.RESET);
export const clearCharacters = createAction(CHARACTER_ACTION_TYPES.CLEAR_STATE);

export const fetchCharacters = createAsyncThunk<
  {},
  string,
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.FETCH_CHARACTERS, async (userId, thunkAPI) => {
  try {
    const characterDocsSnap = await getCharacterDocs(userId);
    const characterDocsMap = new Map<string, CharacterData>();

    characterDocsSnap.forEach((doc) => {
      let data = doc.data() as CharacterData;

      //Make createdBy serializable
      let createdByDocRef = data.createdBy as DocumentReference;
      data.createdBy = createdByDocRef.id;

      //Make createdAt serializable
      let timestamp = data.createdAt as Timestamp;
      data.createdAt = timestamp.toJSON();

      // characterDocsMap.push(data);
      characterDocsMap.set(doc.id, data);
    });

    return Object.fromEntries(characterDocsMap);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create character.');
  }
});

export const createCharacter = createAsyncThunk<
  {
    [id: string]: CharacterData;
  },
  { characterData: CharacterData; userId: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.CREATE_CHARACTER, async ({ characterData, userId }, thunkAPI) => {
  try {
    const characterDocSnap = await createCharacterDoc(characterData, userId);

    const data = characterDocSnap.data();

    //Make createdBy serializable
    let createdByDocRef = data.createdBy as DocumentReference;
    data.createdBy = createdByDocRef.id;

    //Make createdAt serializable
    let timestamp = data.createdAt as Timestamp;
    data.createdAt = timestamp.toJSON();

    return {
      [characterDocSnap.id]: data,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to create character.');
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
  {
    [id: string]: CharacterData;
  },
  { characterId: string; characterData: CharacterData },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(CHARACTER_ACTION_TYPES.UPDATE_CHARACTER, async ({ characterId, characterData }, thunkAPI) => {
  try {
    const updatedCharacterData = { ...characterData } as any;

    //Never need to update these
    delete updatedCharacterData.id;
    delete updatedCharacterData.createdAt;
    delete updatedCharacterData.createdBy;

    const characterDocSnap = await updateCharacterDoc(characterId, updatedCharacterData);

    const data = characterDocSnap.data();

    //Make createdBy serializable
    let createdByDocRef = data.createdBy as DocumentReference;
    data.createdBy = createdByDocRef.id;

    //Make createdAt serializable
    let timestamp = data.createdAt as Timestamp;
    data.createdAt = timestamp.toJSON();

    return {
      [characterDocSnap.id]: data,
    };
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue('Unable to edit character.');
  }
});
