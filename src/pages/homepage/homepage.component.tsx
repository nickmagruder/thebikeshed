/**
 * HomePage Component
 *
 * The main landing page of the application that displays a directory
 * of product categories for users to browse.
 */
import { FC } from 'react';

// Component that renders the menu of product categories
import Directory from '../../components/directory/directory.component';

// Styled component for the homepage container
import { HomePageContainer } from './homepage.styles';

/**
 * HomePage component
 *
 * A simple functional component that renders the Directory component
 * inside a styled container.
 */
const HomePage: FC = () => (
  <HomePageContainer>
    {/* Directory component displaying category menu items */}
    <Directory />
  </HomePageContainer>
);

export default HomePage;
