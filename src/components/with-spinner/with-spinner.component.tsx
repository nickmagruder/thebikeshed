import { FC, ComponentType } from 'react';

import './with-spinner.styles.scss';

// Interface for the loading state prop
interface WithSpinnerProps {
  isLoading: boolean;
  // Other props will be handled via generics
}

// WithSpinner HOC - Shows a loading spinner when content is loading
// Takes any component and returns a new component with loading functionality
const WithSpinner = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // The Spinner component displays either the spinner or the wrapped component
  const Spinner: FC<WithSpinnerProps & P> = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className="spinner-overlay">
        <div className="spinner-container" />
      </div>
    ) : (
      <WrappedComponent {...(otherProps as P)} />
    );
  };
  return Spinner;
};

export default WithSpinner;
