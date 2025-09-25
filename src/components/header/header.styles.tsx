import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Main container for the header
export const HeaderContainer = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px; /* Reduced from 25px to help fit content in viewport */
`;

// Container for the logo with Link functionality
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 100px;
  padding: 25px;
`;

// Container for navigation options
export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .option {
    padding: 10px 15px;
  }
`;

// Styled Link component for navigation options
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
