import { db } from '@utils/firebase/firebase.app';
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  // setDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { CharacterData } from './Character.Types';

/**
 * Create a new document in Firestore/Characters
 */
export const createCharacterDoc = async (characterData: CharacterData, userId: string) => {
  const userDocRef = doc(db, 'profiles', userId);

  if (userDocRef) {
    characterData.createdBy = userDocRef;
  }

  characterData.createdAt = serverTimestamp();

  const characterDocRef = await addDoc(collection(db, 'characters'), characterData);
  const characterDocSnap = await getDoc(characterDocRef);
  return characterDocSnap as QueryDocumentSnapshot<CharacterData>;
};

export const getCharacterDocs = async (userId: string) => {
  const userDocRef = doc(db, 'profiles', userId);

  const q = query(collection(db, 'characters'), where('createdBy', '==', userDocRef));
  const querySnap = await getDocs(q);

  return querySnap;
};

export const getCharacterDoc = async (characterId: string) => {
  const docRef = doc(db, 'characters', characterId);
  const characterDocSnap = await getDoc(docRef);

  return characterDocSnap as QueryDocumentSnapshot<CharacterData>;
};

export const deleteCharacterDoc = async (characterId: string) => {
  const docRef = doc(db, 'characters', characterId);
  await deleteDoc(docRef);
};

export const updateCharacterDoc = async (characterId: string, characterData: any) => {
  const docRef = doc(db, 'characters', characterId);
  await updateDoc(docRef, characterData);
  const characterDocSnap = await getDoc(docRef);

  return characterDocSnap as QueryDocumentSnapshot<CharacterData>;
};
