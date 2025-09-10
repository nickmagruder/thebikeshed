/**
 * Collection Page Component
 *
 * This component renders a specific collection of products based on the URL parameter.
 * It displays the collection title and a grid of product items for that collection.
 */
import React from 'react';
import { connect } from 'react-redux'; // For connecting component to Redux store

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
 * mapStateToProps function
 *
 * Maps Redux state to component props and uses the URL parameter to determine
 * which collection to retrieve from the store.
 *
 * @param {Object} state - The Redux store state
 * @param {Object} ownProps - Props passed to the component including router props
 * @returns {Object} Props object containing the collection
 */
const mapStateToProps = (state, ownProps) => ({
  // selectCollection returns a curried function that takes the state as a parameter
  // ownProps.match.params.collectionId comes from the URL parameter in the route
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

// Connect the CollectionPage component to Redux store
export default connect(mapStateToProps)(CollectionPage);
