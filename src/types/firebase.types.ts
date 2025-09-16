/**
 * Type definition for the SignIn loader response
 */
export interface SignInLoaderResult {
  redirect: boolean;
}

/**
 * Firebase auth-related types
 */
export interface FirebaseUserData {
  id: string;
  displayName: string | null;
  email: string | null;
  createdAt: Date;
  [key: string]: any;
}

export interface FirebaseSnapshot {
  id: string;
  data(): any;
}

export interface FirebaseUserRef {
  onSnapshot(callback: (snapshot: FirebaseSnapshot) => void): void;
}
