/**
 * Shop Page Component
 *
 * This component handles the shop section of the application, including:
 * - Fetching collection data from Firestore
 * - Routing between collections overview and individual collection pages
 * - Loading states while data is being fetched
 */
import React from 'react';
import { Route } from 'react-router-dom'; // For routing within the shop page
import { connect } from 'react-redux'; // For connecting component to Redux store

// Component imports
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'; // Overview of all collections
import CollectionPage from '../collection/collection.component'; // Page for a single collection
import WithSpinner from '../../components/with-spinner/with-spinner.component'; // HOC for loading state

// Action creator to update collections in Redux store
import { updateCollections } from '../../redux/shop/shop.actions';

// Firebase utilities
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Wrap components with WithSpinner HOC to show loading indicator
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

/**
 * ShopPage class component
 *
 * Handles fetching collection data from Firestore and displaying
 * either collections overview or a specific collection based on route
 */
class ShopPage extends React.Component {
  // Component state to track loading status
  state = {
    loading: true,
  };

  // Property to store Firebase subscription for cleanup
  unsubscribeFromSnapShot = null;

  /**
   * Lifecycle method that runs when component mounts
   * Fetches collection data from Firestore and updates Redux store
   */
  componentDidMount() {
    const { updateCollections } = this.props;
    // Get reference to 'collections' collection in Firestore
    const collectionRef = firestore.collection('collections');

    // Get data once (not using real-time listener)
    collectionRef.get().then((snapshot) => {
      // Convert the Firebase snapshot to a format our app can use
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // Update Redux store with collection data
      updateCollections(collectionsMap);
      // Set loading to false once data is received
      this.setState({ loading: false });
    });
  }

  /**
   * Render method for ShopPage component
   * Sets up routes for collections overview and individual collection pages
   *
   * @returns {JSX.Element} - Rendered shop page with routes
   */
  render() {
    const { match } = this.props; // match comes from react-router
    const { loading } = this.state; // loading state determines whether to show spinner
    return (
      <div className="shop-page">
        {/* Route for collections overview (main shop page) */}
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        {/* Route for individual collection pages with URL parameter */}
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

/**
 * mapDispatchToProps function
 *
 * Maps Redux dispatch actions to component props
 *
 * @param {Function} dispatch - Redux dispatch function
 * @returns {Object} Object with action creator functions as props
 */
const mapDispatchToProps = (dispatch) => ({
  // Maps updateCollections action creator to props
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

// Connect the ShopPage component to Redux store
// First parameter is null because we don't need any state from the store
export default connect(null, mapDispatchToProps)(ShopPage);
