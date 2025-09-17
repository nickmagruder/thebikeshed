import { FC, ReactNode } from 'react';
import {
  CustomButtonContainer,
  CustomButtonProps,
} from './custom-button.styles';

// Props interface for the CustomButton component
interface ButtonProps extends CustomButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// CustomButton component - A reusable button component with different styling options
// Can be regular, inverted, or Google sign-in style based on props
const CustomButton: FC<ButtonProps> = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
