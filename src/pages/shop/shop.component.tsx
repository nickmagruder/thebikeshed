/**
 * Shop Page Component
 *
 * This component handles the shop section of the application, including:
 * - Fetching collection data from Firestore
 * - Passing loading state to child routes via Outlet context
 * - Loading states while data is being fetched
 */
import React from 'react';
import { Outlet } from 'react-router-dom'; // For routing within the shop page
import { connect, ConnectedProps } from 'react-redux'; // For connecting component to Redux store
import { Dispatch } from 'redux';

// Action creator to update collections in Redux store
import { updateCollections } from '../../redux/shop/shop.actions';
import { CollectionsMap } from '../../redux/shop/shop.types';

// Firebase utilities
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

/**
 * Interface for ShopPage component state
 */
interface ShopPageState {
  loading: boolean;
}

/**
 * Type for the Outlet context
 */
interface ShopPageOutletContext {
  loading: boolean;
}

/**
 * Type for ShopPage props from Redux connect
 */
type ShopPageProps = ConnectedProps<typeof connector>;

/**
 * ShopPage class component
 *
 * Handles fetching collection data from Firestore and displaying
 * either collections overview or a specific collection based on route
 */
class ShopPage extends React.Component<ShopPageProps, ShopPageState> {
  // Component state to track loading status
  state: ShopPageState = {
    loading: true,
  };

  // Property to store Firebase subscription for cleanup
  unsubscribeFromSnapShot: (() => void) | null = null;

  /**
   * Lifecycle method that runs when component mounts
   * Fetches collection data from Firestore and updates Redux store
   */
  componentDidMount(): void {
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
   */
  render(): React.ReactNode {
    const { loading } = this.state; // loading state determines whether to show spinner
    return (
      <div className="shop-page">
        <Outlet context={{ loading } as ShopPageOutletContext} />
      </div>
    );
  }
}

/**
 * mapDispatchToProps function
 *
 * Maps Redux dispatch actions to component props
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Maps updateCollections action creator to props
  updateCollections: (collectionsMap: CollectionsMap) =>
    dispatch(updateCollections(collectionsMap) as any),
});

// Create connector with connect and mapDispatchToProps
const connector = connect(null, mapDispatchToProps);

// Connect the ShopPage component to Redux store
export default connector(ShopPage);
