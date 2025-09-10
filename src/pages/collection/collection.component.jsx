/**
 * Collection Page Component
 *
 * This component renders a specific collection of products based on the URL parameter.
 * It displays the collection title and a grid of product items for that collection.
 */
import { connect } from 'react-redux'; // For connecting component to Redux store
import { useParams } from 'react-router-dom'; // For accessing URL parameters

// Component that renders individual product items
import CollectionItem from '../../components/collection-item/collection-item.component';

// Selector to fetch a specific collection by ID from the Redux store
import { selectCollection } from '../../redux/shop/shop.selectors';

// Styles for the collection page
import './collection.styles.scss';

/**
 * CollectionPage component
 *
 * @param {Object} collection - The collection object containing title and items array
 * @returns {JSX.Element} - Rendered collection page
 */
const CollectionPage = ({ collection }) => {
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
          items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
};

/**
 * CollectionPageContainer - Wrapper component to provide URL parameters
 * This pattern is needed for React Router v6 since it doesn't pass match props
 */
const CollectionPageContainer = (props) => {
  const { collectionId } = useParams();
  return <CollectionPageWithRouter collectionId={collectionId} {...props} />;
};

/**
 * mapStateToProps function
 *
 * Maps Redux state to component props and uses the URL parameter to determine
 * which collection to retrieve from the store.
 *
 * @param {Object} state - The Redux store state
 * @param {Object} ownProps - Props passed to the component including collectionId
 * @returns {Object} Props object containing the collection
 */
const mapStateToProps = (state, ownProps) => ({
  // selectCollection returns a curried function that takes the state as a parameter
  // collectionId comes from the wrapper component
  collection: selectCollection(ownProps.collectionId)(state),
});

// Connect the CollectionPage component to Redux store
const CollectionPageWithRouter = connect(mapStateToProps)(CollectionPage);

// Export the container component that includes the router params
export default CollectionPageContainer;
