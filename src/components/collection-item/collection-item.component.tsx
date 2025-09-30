import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { CollectionItem as CollectionItemType } from '../../redux/shop/shop.types';
import { CartItem } from '../../types/redux.types';

import './collection-item.styles.scss';

// Props expected by component before connecting to Redux
interface CollectionItemOwnProps {
  item: CollectionItemType;
  collectionId?: string;
}

// Combined props from Redux connect and own props
type CollectionItemProps = ConnectedProps<typeof connector> &
  CollectionItemOwnProps;

// CollectionItem component - displays a product with image, name, price, and add to cart button
const CollectionItem: FC<CollectionItemProps> = ({
  item,
  addItem,
  collectionId
}) => {
  const { name, imageUrl, price } = item;
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (collectionId) {
      navigate(`/shop/${collectionId}/${item.id}`);
    }
  };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick();
          }
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
  addItem: (item: CollectionItemType) =>
    dispatch(addItem(item as CartItem) as any) // eslint-disable-line @typescript-eslint/no-explicit-any
});

// Create connector
const connector = connect(null, mapDispatchToProps);

export default connector(CollectionItem);
