import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dispatch } from 'redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { RootState } from '../../types/redux.types';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

// Props from Redux connect
type CartIconProps = ConnectedProps<typeof connector>;

// CartIcon component - displays shopping cart icon with item count
const CartIcon: FC<CartIconProps> = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// Maps dispatch actions to component props
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden() as any) // eslint-disable-line @typescript-eslint/no-explicit-any
});

// Maps Redux state to component props using reselect
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    itemCount: number;
  }
>({
  itemCount: selectCartItemsCount
});

// Create connector
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CartIcon);
