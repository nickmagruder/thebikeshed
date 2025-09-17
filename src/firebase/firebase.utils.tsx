import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

/**
 * Firebase configuration interface
 */
interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
}

/**
 * Firebase configuration object
 * Uses environment variables to store sensitive information
 * These variables are defined in the .env.development file at the project root
 */
const config: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase configuration is properly loaded from environment variables
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  console.error(
    'Firebase configuration is missing. Make sure your environment variables are set up correctly. ' +
    'In development, check your .env.development file. ' +
    'In production on Heroku, check your config vars.'
  );
}

firebase.initializeApp(config);

/**
 * User authentication data from Firebase
 */
export interface UserAuth {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  providerId?: string;
}

/**
 * Additional user data that can be provided during user creation
 */
export interface AdditionalUserData {
  [key: string]: any;
}

/**
 * Creates or retrieves a user document from Firestore
 * @param userAuth - The user authentication object from Firebase Auth
 * @param additionalData - Optional additional data to store with the user
 * @returns The Firestore document reference for the user
 */
export const createUserProfileDocument = async (
  userAuth: UserAuth | null, 
  additionalData?: AdditionalUserData
): Promise<firebase.firestore.DocumentReference | undefined> => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: unknown) {
      console.log('error creating user', error instanceof Error ? error.message : 'Unknown error');
    }
  }
  return userRef;
};

/**
 * Collection item interface that represents an object to be stored in Firestore
 */
export interface ShopItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  [key: string]: any;
}

/**
 * Collection data interface representing a shop collection
 */
export interface ShopCollection {
  id?: string;
  title: string;
  items: ShopItem[];
  [key: string]: any;
}

/**
 * Adds multiple documents to a Firestore collection in a batch operation
 * @param collectionKey - The name of the collection in Firestore
 * @param objectsToAdd - An array of objects to add to the collection
 * @returns A promise that resolves when the batch operation is complete
 */
export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: ShopCollection[]
): Promise<void> => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj: ShopCollection) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return batch.commit();
};

/**
 * Transformed collection with route name added
 */
export interface TransformedCollection extends ShopCollection {
  routeName: string;
}

/**
 * Collection map where keys are the lowercase collection titles
 */
export interface CollectionsMap {
  [key: string]: TransformedCollection;
}

/**
 * Converts a Firestore collections snapshot to a map of collections
 * @param collections - The Firestore QuerySnapshot of collections
 * @returns A map of collections with the collection title as the key
 */
export const convertCollectionsSnapshotToMap = (
  collections: firebase.firestore.QuerySnapshot
): CollectionsMap => {
  const transformedCollection: TransformedCollection[] = collections.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot) => {
      const { title, items } = doc.data() as ShopCollection;

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    }
  );

  return transformedCollection.reduce(
    (accumulator: CollectionsMap, collection: TransformedCollection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, 
    {} as CollectionsMap
  );
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
