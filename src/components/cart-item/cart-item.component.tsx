import React, { FC, memo } from 'react';
import { CartItem as CartItemType } from '../../types/redux.types';

import './cart-item.styles.scss';

// Props for CartItem component
interface CartItemProps {
  item: CartItemType;
}

// CartItem component - displays individual cart items in the cart dropdown
// Memoized to prevent unnecessary re-renders when cart items change
const CartItem: FC<CartItemProps> = ({
  item: { imageUrl, price, name, quantity }
}) => (
  <div className="cart-item">
    <img src={imageUrl} alt={name} />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

// Memoize the component to optimize performance when the cart has many items
export default memo(CartItem);
