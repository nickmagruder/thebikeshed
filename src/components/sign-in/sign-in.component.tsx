import React, { FormEvent, ChangeEvent, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

// Interface for sign-in form state
interface SignInFormState {
  email: string;
  password: string;
}

// Functional SignIn component - Handles user authentication with email/password or Google
const SignIn: React.FC = () => {
  // State hook for form fields
  const [formState, setFormState] = useState<SignInFormState>({
    email: '',
    password: ''
  });

  const { email, password } = formState;

  // Handles form submission and authentication with Firebase
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Reset form fields after successful sign-in
      setFormState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  // Updates form field values when user types
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign-in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          required
          label="Email"
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          required
          label="Password"
        />
        <div className="buttons">
          {/* Submit button for the sign-in form */}
          <CustomButton onClick={() => {}} type="submit">
            Sign In
          </CustomButton>
          {/* Google sign-in button */}
          <CustomButton
            onClick={signInWithGoogle}
            isgooglesignin="true"
            type="button"
          >
            {' '}
            Sign In with Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
