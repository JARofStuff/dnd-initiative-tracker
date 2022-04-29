import type { Timestamp, FieldValue } from 'firebase/firestore';

export interface ProfileData {
  displayName: string | null;
  email: string | null;
  createdAt: FieldValue | Timestamp | { seconds: number; nanoseconds: number };
  photoURL: string | null;
  isAdmin?: boolean;
}
