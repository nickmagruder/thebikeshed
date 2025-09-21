/**
 * Collection Page Component
 *
 * This component renders a specific collection of products based on the URL parameter.
 * It displays the collection title and a grid of product items for that collection.
 */
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux'; // For connecting component to Redux store
import { useParams } from 'react-router-dom'; // For accessing URL parameters

// Types
import { RootState } from '../../types/redux.types';
import {
  Collection,
  CollectionItem as CollectionItemType,
} from '../../redux/shop/shop.types';

// Component that renders individual product items
import CollectionItem from '../../components/collection-item/collection-item.component';

// Selector to fetch a specific collection by ID from the Redux store
import { selectCollection } from '../../redux/shop/shop.selectors';

// Styles for the collection page
import './collection.styles.scss';

/**
 * Props for CollectionPage component
 */
interface CollectionPageProps {
  collection: Collection;
}

/**
 * CollectionPage component
 */
const CollectionPage: FC<CollectionPageProps> = ({ collection }) => {
  // Destructure the title and items from the collection object
  const { title, items } = collection;
  return (
    <div className="collection-page">
      {/* Display the collection title */}
      <h2 className="title">{title}</h2>
      {/* Grid container for collection items */}
      <div className="items">
        {
          /* Map through collection items and render a CollectionItem component for each */
          items.map((item: CollectionItemType) => (
            <CollectionItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
};

/**
 * Props for the container component
 */
interface ContainerProps {
  // Container props can include anything passed from parent components
}

/**
 * CollectionPageContainer - Wrapper component to provide URL parameters
 * This pattern is needed for React Router v6 since it doesn't pass match props
 */
const CollectionPageContainer: FC<ContainerProps> = (props) => {
  // useParams returns a Record of params from the URL
  const params = useParams<Record<string, string>>();
  const collectionId = params.collectionId || '';

  // Only render if we have a valid collection ID
  if (!collectionId) {
    return <div className="collection-page">Collection not found</div>;
  }

  return <CollectionPageWithRouter collectionId={collectionId} {...props} />;
};

/**
 * Props expected by the connected component
 */
interface OwnProps {
  collectionId: string;
}

/**
 * mapStateToProps function
 *
 * Maps Redux state to component props and uses the URL parameter to determine
 * which collection to retrieve from the store.
 */
const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  // selectCollection returns a curried function that takes the state as a parameter
  // collectionId comes from the wrapper component
  collection: selectCollection(ownProps.collectionId)(state),
});

// Create the connector
const connector = connect(mapStateToProps);

// Generate the connected component type
type CollectionPageWithRouterProps = ConnectedProps<typeof connector> &
  OwnProps;

// Connect the CollectionPage component to Redux store
const CollectionPageWithRouter = connector(
  CollectionPage as FC<CollectionPageWithRouterProps>
);

// Export the container component that includes the router params
export default CollectionPageContainer;
