import React, { FormEvent, ChangeEvent } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

// Interface for sign-in form state
interface SignInState {
  email: string;
  password: string;
}

// Sign-in component - Handles user authentication with email/password or Google
class SignIn extends React.Component<{}, SignInState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  // Handles form submission and authentication with Firebase
  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  // Updates form field values when user types
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    this.setState({ [name]: value } as Pick<SignInState, keyof SignInState>);
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign-in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
            label="Email"
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
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
  }
}

export default SignIn;
