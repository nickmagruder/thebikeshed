import React, { FC } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionPage from '../../pages/collection/collection.component';

// Type for the outlet context provided by React Router
interface ShopPageOutletContext {
  loading: boolean;
}

// Define the props type for the wrapped component
// This ensures TypeScript knows about the collectionId prop
interface CollectionPageContainerProps {
  collectionId: string;
}

// CollectionPageWithOutletContext - Component that accesses loading state from outlet context
// and passes URL parameters to the collection page component
const CollectionPageWithOutletContext: FC = () => {
  // Use the outlet context with proper typing, provide fallback default
  const { loading } = useOutletContext<ShopPageOutletContext>() || {
    loading: true,
  };

  // Get URL parameters with proper typing
  const params = useParams<Record<string, string>>();
  const collectionId = params.collectionId || '';

  // Apply the HOC to our component with explicit typing
  const CollectionPageWithSpinner = WithSpinner<CollectionPageContainerProps>(CollectionPage);

  return (
    <CollectionPageWithSpinner
      isLoading={loading}
      collectionId={collectionId}
    />
  );
};

export default CollectionPageWithOutletContext;
