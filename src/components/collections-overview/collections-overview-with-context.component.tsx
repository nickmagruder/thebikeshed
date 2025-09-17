import React, { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

// Type for the outlet context provided by React Router
interface ShopPageOutletContext {
  loading: boolean;
}

// CollectionsOverviewWithOutletContext - Component that accesses loading state from outlet context
// and wraps CollectionsOverview with the WithSpinner HOC
const CollectionsOverviewWithOutletContext: FC = () => {
  // Use the outlet context with proper typing, provide fallback default
  const { loading } = useOutletContext<ShopPageOutletContext>() || {
    loading: true,
  };

  // Apply the HOC to our component
  const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

  return <CollectionsOverviewWithSpinner isLoading={loading} />;
};

export default CollectionsOverviewWithOutletContext;
