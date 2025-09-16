import { CartItem } from '../../types/redux.types';

/**
 * Enum for cart action type constants
 */
export enum CartActionType {
  TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN',
  ADD_ITEM = 'ADD_ITEM',
  CLEAR_ITEM = 'CLEAR_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

/**
 * Interface for toggle cart hidden action
 */
export interface ToggleCartHiddenAction {
  type: CartActionType.TOGGLE_CART_HIDDEN;
}

/**
 * Interface for add item action
 */
export interface AddItemAction {
  type: CartActionType.ADD_ITEM;
  payload: CartItem;
}

/**
 * Interface for clear item action
 */
export interface ClearItemAction {
  type: CartActionType.CLEAR_ITEM;
  payload: CartItem;
}

/**
 * Interface for remove item action
 */
export interface RemoveItemAction {
  type: CartActionType.REMOVE_ITEM;
  payload: CartItem;
}

/**
 * Union type for all cart actions
 */
export type CartAction =
  | ToggleCartHiddenAction
  | AddItemAction
  | ClearItemAction
  | RemoveItemAction;
