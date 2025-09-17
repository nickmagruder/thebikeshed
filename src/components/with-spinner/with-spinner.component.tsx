import { FC, ComponentType } from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Interface for the loading state prop
interface WithSpinnerProps {
  isLoading: boolean;
  [key: string]: any; // For other props that will be passed to wrapped component
}

// WithSpinner HOC - Shows a loading spinner when content is loading
// Takes any component and returns a new component with loading functionality
const WithSpinner = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // The Spinner component displays either the spinner or the wrapped component
  const Spinner: FC<WithSpinnerProps & P> = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...(otherProps as P)} />
    );
  };
  return Spinner;
};

export default WithSpinner;
