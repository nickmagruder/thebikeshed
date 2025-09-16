import { combineReducers, Reducer } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import { RootState } from '../types/redux.types';

/**
 * Configuration for Redux Persist
 * Specifies what parts of the store should be persisted
 */
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['cart'] // Only cart data will be persisted
};

/**
 * The root reducer combining all reducer slices
 * Each reducer handles a specific slice of the state
 */
const rootReducer = combineReducers({
  user: userReducer as Reducer<RootState['user']>,
  cart: cartReducer as Reducer<RootState['cart']>,
  directory: directoryReducer as Reducer<RootState['directory']>,
  shop: shopReducer as Reducer<RootState['shop']>
});

export default persistReducer<RootState>(persistConfig, rootReducer);
