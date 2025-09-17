/**
 * Type definition for the SignIn loader response
 */
export interface SignInLoaderResult {
  redirect: boolean;
}

// Firebase auth-related types
export interface FirebaseUserData {
  id: string;
  displayName: string | null;
  email: string | null;
  createdAt: Date;
  [key: string]: unknown; // For additional properties that may come from Firebase
}

export interface FirebaseSnapshot {
  id: string;
  data(): unknown;
}

export interface FirebaseUserRef {
  onSnapshot(callback: (snapshot: FirebaseSnapshot) => void): void;
}
