import app from '@utils/firebase/firebase.app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  updateProfile,
  NextOrObserver,
  User,
} from 'firebase/auth';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// EMAIL AUTH
// Sign up new users
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    //  Sign up New Users
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Makes sure there's a display name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: displayName });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// Sign in Existing Users
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const { user } = await await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw message;
  }
};

// SIGN OUT
export const signOutUser = () => signOut(auth);

// AUTH STATE
export const authStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// GOOGLE AUTH
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// GITHUB AUTH
const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
  allow_signup: 'false',
});

export const signInWithGithubRedirect = () => signInWithRedirect(auth, githubProvider);

export const signInRedirectListener = async () => {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    throw error;
  }
};
