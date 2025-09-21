/**
 * Shop Page Component
 *
 * This component handles the shop section of the application, including:
 * - Fetching collection data from Firestore
 * - Passing loading state to child routes via Outlet context
 * - Loading states while data is being fetched
 */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // For routing within the shop page
import { useAppDispatch } from '../../types/hooks'; // Custom typed dispatch hook

// Action creator to update collections in Redux store
import { updateCollections } from '../../redux/shop/shop.actions';
import { CollectionsMap } from '../../redux/shop/shop.types';

// Firebase utilities
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Type for the Outlet context
interface ShopPageOutletContext {
  loading: boolean;
}

/**
 * ShopPage functional component
 *
 * Handles fetching collection data from Firestore and displaying
 * either collections overview or a specific collection based on route
 */
const ShopPage: React.FC = () => {
  // State hook to track loading status
  const [loading, setLoading] = useState(true);
  
  // Get dispatch function from Redux
  const dispatch = useAppDispatch();

  // Effect hook to fetch collection data on component mount
  // Replaces componentDidMount lifecycle method
  useEffect(() => {
    // Get reference to 'collections' collection in Firestore
    const collectionRef = firestore.collection('collections');

    // Get data once (not using real-time listener)
    collectionRef.get().then((snapshot) => {
      // Convert the Firebase snapshot to a format our app can use
      const firebaseCollectionsMap = convertCollectionsSnapshotToMap(snapshot);
      
      // Convert the Firebase collections map to the format expected by Redux
      const reduxCollectionsMap: CollectionsMap = Object.keys(firebaseCollectionsMap).reduce(
        (accumulator, key) => {
          const collection = firebaseCollectionsMap[key];
          accumulator[key] = {
            id: Number(collection.id) || 0, // Convert string ID to number
            title: collection.title,
            routeName: collection.routeName,
            items: collection.items,
          };
          return accumulator;
        },
        {} as CollectionsMap
      );
      
      // Update Redux store with collection data
      dispatch(updateCollections(reduxCollectionsMap));
      // Set loading to false once data is received
      setLoading(false);
    });

  }, [dispatch]); // Only re-run effect if dispatch changes (it shouldn't)

  return (
    <div className="shop-page">
      <Outlet context={{ loading } as ShopPageOutletContext} />
    </div>
  );
};

export default ShopPage;
