import React, { FC } from 'react';
import { CollectionItem as CollectionItemType } from '../../redux/shop/shop.types';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

// Props for the CollectionPreview component
interface CollectionPreviewProps {
  title: string;
  items: CollectionItemType[];
  routeName?: string; // Optional as it might be spread from parent component
}

// CollectionPreview component - displays a preview of items in a collection
const CollectionPreview: FC<CollectionPreviewProps> = ({
  title,
  items,
  routeName
}) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            collectionId={routeName || title.toLowerCase()}
          />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
