/**
 * Main App component
 *
 * Handles global authentication state, header rendering, and routing via React Router's Outlet.
 * Connects to Redux for user state management.
 *
 * @component
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { User, RootState, AppDispatch } from './types/redux.types';
import { FirebaseSnapshot } from './types/firebase.types';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Define types for props
interface AppProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

class App extends React.Component<AppProps> {
  // Type for the unsubscribe function
  unsubscribeFromAuth: (() => void) | null = null;

  /**
   * On mount, subscribe to Firebase auth state changes and update Redux store.
   */
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot((snapShot: FirebaseSnapshot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          });
        }
      }

      setCurrentUser(userAuth as User | null);
    });
  }

  /**
   * Unsubscribe from Firebase auth listener on unmount.
   */
  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  /**
   * Renders the application header and routed content.
   */
  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}

/**
 * Maps Redux state to App props.
 */
const mapStateToProps = createStructuredSelector<
  RootState,
  Pick<AppProps, 'currentUser'>
>({
  currentUser: selectCurrentUser,
});

/**
 * Maps dispatch actions to App props.
 */
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setCurrentUser: (user: User | null) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
