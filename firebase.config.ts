import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBx2i54D8iokrwZMvB0Jp7yBXmJOEORPyg',
  authDomain: 'dnd-dm-screen.firebaseapp.com',
  projectId: 'dnd-dm-screen',
  storageBucket: 'dnd-dm-screen.appspot.com',
  messagingSenderId: '1094383051892',
  appId: '1:1094383051892:web:5374932762cf29408edd21',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);

export default app;
