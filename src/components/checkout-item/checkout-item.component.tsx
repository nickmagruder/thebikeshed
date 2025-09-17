import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';
import { CartItem } from '../../types/redux.types';

import './checkout-item.styles.scss';

// Props expected by component before connecting to Redux
interface CheckoutItemOwnProps {
  cartItem: CartItem;
}

// Combined props from Redux connect and own props
type CheckoutItemProps = ConnectedProps<typeof connector> &
  CheckoutItemOwnProps;

// CheckoutItem component - displays a cart item in the checkout page
// with quantity adjusters and remove button
const CheckoutItem: FC<CheckoutItemProps> = ({
  cartItem,
  clearItem,
  addItem,
  removeItem,
}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

// Maps dispatch actions to component props
const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearItem: (item: CartItem) => dispatch(clearItemFromCart(item) as any),
  addItem: (item: CartItem) => dispatch(addItem(item) as any),
  removeItem: (item: CartItem) => dispatch(removeItem(item) as any),
});

// Create connector
const connector = connect(null, mapDispatchToProps);

export default connector(CheckoutItem);
