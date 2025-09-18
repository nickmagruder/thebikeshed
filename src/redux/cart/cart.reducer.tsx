import { CartActionType, CartAction } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';
import { CartState } from '../../types/redux.types';

// Initial state for the cart reducer
const INITIAL_STATE: CartState = {
  hidden: true,
  cartItems: [],
};

/**
 * Cart reducer - handles all cart-related state changes
 *
 * @param state - Current cart state, defaults to INITIAL_STATE
 * @param action - Action dispatched to modify the state
 * @returns New state with updated cart data
 */
const cartReducer = (state = INITIAL_STATE, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionType.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionType.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
