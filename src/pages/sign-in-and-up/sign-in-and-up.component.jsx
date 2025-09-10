/**
 * Sign In and Sign Up Page Component
 *
 * This component renders the authentication page that contains both
 * the sign in and sign up forms side by side.
 */
import React from 'react';

// Import authentication form components
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

// Import styles for the page
import './sign-in-and-up.styles.scss';

/**
 * SignInAndSignUpPage component
 *
 * A functional component that renders both SignIn and SignUp components
 * side by side in a container with flex layout (defined in the SCSS).
 *
 * @returns {JSX.Element} - Rendered sign in and sign up page
 */
const SignInAndSignUpPage = () => (
  <div className="sign-in-and-up">
    {/* SignIn component for existing users */}
    <SignIn />
    {/* SignUp component for new users */}
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
