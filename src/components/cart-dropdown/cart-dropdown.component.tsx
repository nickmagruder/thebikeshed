import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartItem as CartItemType, RootState } from '../../types/redux.types';

import './cart-dropdown.styles.scss';

// Props from Redux connect
type CartDropdownProps = ConnectedProps<typeof connector>;

// CartDropdown component - displays a dropdown with cart items and checkout button
const CartDropdown: FC<CartDropdownProps> = ({ cartItems, dispatch }) => {
  // Using React Router v6 navigation hook
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem: CartItemType) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate('/checkout');
          dispatch(toggleCartHidden() as any);
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// Maps Redux state to component props using reselect
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    cartItems: CartItemType[];
  }
>({
  cartItems: selectCartItems,
});

// Create connector
const connector = connect(mapStateToProps);

export default connector(CartDropdown);
