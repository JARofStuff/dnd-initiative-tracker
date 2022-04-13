import app from '@root/firebase.config';

import {
  getFirestore,
  // doc,
  // getDoc,
  // setDoc,
  // serverTimestamp,
  // DocumentSnapshot,
  // QueryDocumentSnapshot,
  // FieldValue,
  // DocumentData,
} from 'firebase/firestore';

// Initialize Firebase
const db = getFirestore(app);

// // Create Doc for New Users
// export const createUserDocFromUser = async (
//   user: User
// ): Promise<QueryDocumentSnapshot<UserData>> => {
//   const userDocRef = doc(db, 'users', user.uid);
//   const userDocSnap = await getDoc(userDocRef);

//   if (!userDocSnap.exists()) {
//     const { displayName, email } = user;

//     const newUserDoc: UserData = {
//       displayName,
//       email,
//       createdAt: serverTimestamp(),
//       isAdmin: false,
//     };

//     try {
//       await setDoc(userDocRef, newUserDoc);
//       const newUserDocSnap = await getDoc(userDocRef);
//       return newUserDocSnap as QueryDocumentSnapshot<UserData>;
//     } catch (error) {
//       throw error;
//     }
//   }
//   return userDocSnap as QueryDocumentSnapshot<UserData>;
// };
