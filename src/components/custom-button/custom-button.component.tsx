import { FC, ReactNode } from 'react';
import './custom-button.styles.scss';

// Props interface for the custom button styling
interface CustomButtonProps {
  inverted?: boolean;
  isgooglesignin?: string;
}

// Props interface for the CustomButton component
interface ButtonProps extends CustomButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// CustomButton component - A reusable button component with different styling options
// Can be regular, inverted, or Google sign-in style based on props
const CustomButton: FC<ButtonProps> = ({
  children,
  inverted,
  isgooglesignin,
  ...otherProps
}) => {
  // Create class names based on props
  const buttonClassName = `custom-button${inverted ? ' inverted' : ''}${
    isgooglesignin === 'true' ? ' google-sign-in' : ''
  }`;

  return (
    <button className={buttonClassName} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
