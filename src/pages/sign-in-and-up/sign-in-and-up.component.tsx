/**
 * Sign In and Sign Up Page Component
 *
 * This component renders the authentication page that contains both
 * the sign in and sign up forms side by side.
 */
import React, { FC } from 'react';
import { useLoaderData, Navigate } from 'react-router-dom';

// Import authentication form components
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

// Import the SignInLoaderResult type
import { SignInLoaderResult } from '../../types/firebase.types';

// Import styles for the page
import './sign-in-and-up.styles.scss';

/**
 * SignInAndSignUpPage component
 *
 * A functional component that renders both SignIn and SignUp components
 * side by side in a container with flex layout (defined in the SCSS).
 * Uses React Router v7 hooks for navigation and loader data.
 */
const SignInAndSignUpPage: FC = () => {
  // Get loader data to check if user should be redirected
  // TypeCast the loader data to the correct type
  const { redirect } = useLoaderData() as SignInLoaderResult;

  // If user is already signed in, redirect to home page
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sign-in-and-up">
      {/* SignIn component for existing users */}
      <SignIn />
      {/* SignUp component for new users */}
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
