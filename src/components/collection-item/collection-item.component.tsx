import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { CollectionItem as CollectionItemType } from '../../redux/shop/shop.types';

import './collection-item.styles.scss';

// Props expected by component before connecting to Redux
interface CollectionItemOwnProps {
  item: CollectionItemType;
}

// Combined props from Redux connect and own props
type CollectionItemProps = ConnectedProps<typeof connector> &
  CollectionItemOwnProps;

// CollectionItem component - displays a product with image, name, price, and add to cart button
const CollectionItem: FC<CollectionItemProps> = ({ item, addItem }) => {
  const { name, imageUrl, price } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <div className="collection-footer">
        <span className="name"> {name} </span>
        <span className="price">${price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)}> Add to Cart </CustomButton>
    </div>
  );
};

// Maps dispatch actions to component props
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (item: CollectionItemType) => dispatch(addItem(item as any) as any),
});

// Create connector
const connector = connect(null, mapDispatchToProps);

export default connector(CollectionItem);
