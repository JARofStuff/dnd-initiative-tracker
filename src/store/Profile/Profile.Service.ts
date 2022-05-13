import { db } from '@utils/firebase/firebase.app';
import { doc, getDoc, setDoc, serverTimestamp, QueryDocumentSnapshot } from 'firebase/firestore';
import type { UserInfo } from 'firebase/auth';
import type { ProfileData } from './Profile.Types';

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
