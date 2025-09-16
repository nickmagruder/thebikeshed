/**
 * Main App component
 *
 * Handles global authentication state, header rendering, and routing via React Router's Outlet.
 * Connects to Redux for user state management.
 *
 * @component
 */

import React from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "./components/header/header.component";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  /**
   * On mount, subscribe to Firebase auth state changes and update Redux store.
   */
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  /**
   * Unsubscribe from Firebase auth listener on unmount.
   */
  componentWillUnmount() {
    this.unsubscribeFromAuth();
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

/**
 * Maps dispatch actions to App props.
 */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
