// Main App component
// Handles global authentication state, header rendering, and routing via React Router's Outlet.
// Uses Redux hooks for state management.
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.actions';
import { User } from './types/redux.types';
import { FirebaseSnapshot } from './types/firebase.types';
import { useAppDispatch } from './types/hooks';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

/**
 * Main application component using functional component pattern with hooks
 */
const App: React.FC = () => {
  // We don't need currentUser directly in this component anymore,
  // as Header component likely consumes it via its own hooks
  
  // Get the dispatch function to update Redux state
  const dispatch = useAppDispatch();
  
  // Use a ref to store the unsubscribe function
  const unsubscribeFromAuthRef = useRef<(() => void) | null>(null);

  // Effect hook to handle authentication state changes
  // Replaces componentDidMount and componentWillUnmount
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    unsubscribeFromAuthRef.current = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot((snapShot: FirebaseSnapshot) => {
            const data = (snapShot.data() || {}) as Partial<User>;
            dispatch(setCurrentUser({
              id: snapShot.id,
              email: data.email ?? '',
              createdAt: data.createdAt ?? new Date(0),
              ...data,
            }));
          });
        }
      }

      dispatch(setCurrentUser(userAuth as User | null));
    });

    // Cleanup function (replaces componentWillUnmount)
    return () => {
      if (unsubscribeFromAuthRef.current) {
        unsubscribeFromAuthRef.current();
      }
    };
  }, [dispatch]); // Only re-run if dispatch changes (which it shouldn't)

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
