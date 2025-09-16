import { createSelector } from 'reselect';
import { RootState, CartItem } from '../../types/redux.types';

/**
 * Base selector for cart state
 */
const selectCart = (state: RootState) => state.cart;

/**
 * Selector to get cart items
 */
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

/**
 * Selector to get cart hidden state
 */
export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

/**
 * Selector to get total quantity of items in cart
 */
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]): number =>
    cartItems.reduce(
      (accumulatedQuantity: number, cartItem: CartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

/**
 * Selector to get total price of items in cart
 */
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]): number =>
    cartItems.reduce(
      (accumulatedQuantity: number, cartItem: CartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
