import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCeKqROIx8D_4QEgX7_hbrDm7hQyF6LUIk",
  authDomain: "ecommerce-42edc.firebaseapp.com",
  projectId: "ecommerce-42edc",
  storageBucket: "ecommerce-42edc.appspot.com",
  messagingSenderId: "512686136384",
  appId: "1:512686136384:web:83da25193915832d6493a5",
  measurementId: "G-6HYR1JLW1L"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
