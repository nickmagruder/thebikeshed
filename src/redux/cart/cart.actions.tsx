import {
  CartActionType,
  ToggleCartHiddenAction,
  AddItemAction,
  ClearItemAction,
  RemoveItemAction,
} from './cart.types';
import { CartItem } from '../../types/redux.types';

/**
 * Action creator to toggle cart hidden state
 * @returns Action object to toggle cart visibility
 */
export const toggleCartHidden = (): ToggleCartHiddenAction => ({
  type: CartActionType.TOGGLE_CART_HIDDEN,
});

/**
 * Action creator to add an item to cart
 * @param item - Item to add to cart
 * @returns Action object with item payload
 */
export const addItem = (item: CartItem): AddItemAction => ({
  type: CartActionType.ADD_ITEM,
  payload: item,
});

/**
 * Action creator to completely remove an item from cart
 * @param item - Item to remove from cart
 * @returns Action object with item payload
 */
export const clearItemFromCart = (item: CartItem): ClearItemAction => ({
  type: CartActionType.CLEAR_ITEM,
  payload: item,
});

/**
 * Action creator to decrease quantity of an item in cart
 * @param item - Item to decrease quantity of
 * @returns Action object with item payload
 */
export const removeItem = (item: CartItem): RemoveItemAction => ({
  type: CartActionType.REMOVE_ITEM,
  payload: item,
});
