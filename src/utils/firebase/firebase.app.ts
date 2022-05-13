import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '@root/firebase.config';

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);
export default app;
