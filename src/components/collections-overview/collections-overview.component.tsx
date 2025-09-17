import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { Collection } from '../../redux/shop/shop.types';
import { RootState } from '../../types/redux.types';

import './collections-overview.styles.scss';

// Props received from Redux connect
type CollectionsOverviewProps = ConnectedProps<typeof connector>;

// CollectionsOverview component - displays preview of all collections
const CollectionsOverview: FC<CollectionsOverviewProps> = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

// Maps Redux state to component props using reselect
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    collections: Collection[];
  }
>({
  collections: selectCollectionsForPreview,
});

// Create connector
const connector = connect(mapStateToProps);

export default connector(CollectionsOverview);
