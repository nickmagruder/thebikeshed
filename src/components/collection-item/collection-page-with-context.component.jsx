import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionPage from '../../pages/collection/collection.component';

// Create a component that accesses loading state from outlet context
const CollectionPageWithOutletContext = () => {
  const { loading } = useOutletContext() || { loading: true };
  const params = useParams();
  const CollectionPageWithSpinner = WithSpinner(CollectionPage);
  
  return <CollectionPageWithSpinner isLoading={loading} collectionId={params.collectionId} />;
};

export default CollectionPageWithOutletContext;
