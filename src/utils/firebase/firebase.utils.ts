import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase.config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  updateProfile,
  NextOrObserver,
  User,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

export type UserData = {
  displayName: string
  email: string
  createdAt: Date
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// EMAIL AUTH
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName?: string
): Promise<void> => {
  if (!email || !password) return

  try {
    //  Sign up New Users
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Makes sure there's a display name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: displayName })
    }

    createUserDocFromUser(user)
  } catch (error) {
    console.log(error)
  }
}

// Sign in Existing Users
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
  if (!email || !password) return

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}

// GOOGLE AUTH
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const catchGoogleSignInRedirect = async () => {
  try {
    const response = await getRedirectResult(auth)
    if (response) {
      createUserDocFromUser(response.user)
    }
  } catch (error) {
    console.log(error)
  }
}

// AUTH STATE
export const authStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

// SIGN OUT
export const signOutUser = () => signOut(auth)

// Create Doc for new Users
export const createUserDocFromUser = async (
  user: User
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!user) return

  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = user

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
}
