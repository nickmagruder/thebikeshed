import { ShopActionType, ShopAction } from './shop.types';
import { ShopState } from '../../types/redux.types';

/**
 * Initial state for the shop reducer
 */
const INITIAL_STATE: ShopState = {
  collections: null,
};

/**
 * Shop reducer - handles all shop-related state changes
 *
 * @param state - Current shop state, defaults to INITIAL_STATE
 * @param action - Action dispatched to modify the state
 * @returns New state with updated collections if applicable
 */
const shopReducer = (state = INITIAL_STATE, action: ShopAction): ShopState => {
  switch (action.type) {
    case ShopActionType.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
