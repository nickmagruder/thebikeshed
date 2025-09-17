import styled, { css } from 'styled-components';

// Props interface for the custom button styling
export interface CustomButtonProps {
  inverted?: boolean;
  isgooglesignin?: string;
}

// Base button styles
const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

// Styles for inverted button appearance
const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

// Styles for Google sign-in button
const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

// Function to determine which button style to apply based on props
const getButtonStyles = (props: any) => {
  if (props.isgooglesignin === 'true') {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

// Styled button component with dynamic styling based on props
export const CustomButtonContainer = styled.button<CustomButtonProps>`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButtonStyles}
`;
