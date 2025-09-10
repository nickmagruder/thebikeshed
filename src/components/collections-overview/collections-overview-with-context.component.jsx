import React from 'react';
import { useOutletContext } from 'react-router-dom';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

// Create a component that accesses loading state from outlet context
const CollectionsOverviewWithOutletContext = () => {
  const { loading } = useOutletContext() || { loading: true };
  const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
  
  return <CollectionsOverviewWithSpinner isLoading={loading} />;
};

export default CollectionsOverviewWithOutletContext;
