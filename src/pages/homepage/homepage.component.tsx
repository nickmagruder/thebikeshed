// HomePage Component
//
// The main landing page of the application that displays a directory
// of product categories for users to browse.
import { FC } from 'react';

// Component that renders the menu of product categories
import Directory from '../../components/directory/directory.component';

// Import SCSS styles
import './homepage.styles.scss';

// HomePage component
//
// A simple functional component that renders the Directory component
// inside a container with SCSS styling.
const HomePage: FC = () => (
  <div className="homepage-container">
    {/* Directory component displaying category menu items */}
    <Directory />
  </div>
);

export default HomePage;
