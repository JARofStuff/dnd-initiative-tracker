import app from '@root/firebase.config';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  // DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
  // DocumentData,
  FieldValue,
} from 'firebase/firestore';
import type { UserInfo } from 'firebase/auth';

// Initialize Firebase
const db = getFirestore(app);

export interface ProfileData {
  displayName: string | null;
  email: string | null;
  createdAt: FieldValue | Timestamp | { seconds: number; nanoseconds: number };
  photoURL: string | null;
  isAdmin?: boolean;
}

/**
 * Retrieved a document from Firestore from UserData
 * If it doesnt exists, it will create it from the UserData in redux state
 * @param  {UserInfo} userData - User data in state. Created from User.providerInfo
 */
export const createUserDocFromUser = async (
  userData: UserInfo
): Promise<QueryDocumentSnapshot<ProfileData>> => {
  const { uid, displayName, email, photoURL } = userData;

  const userDocRef = doc(db, 'profiles', uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt: serverTimestamp(),
        isAdmin: false,
      });
      const userDocSnap = await getDoc(userDocRef);
      return userDocSnap as QueryDocumentSnapshot<ProfileData>;
    } catch (error) {
      throw error;
    }
  }
  return userDocSnap as QueryDocumentSnapshot<ProfileData>;
};
