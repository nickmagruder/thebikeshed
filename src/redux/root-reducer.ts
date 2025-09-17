import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// Root reducer combining all reducer slices
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// Export the root reducer type
export type RootReducerState = ReturnType<typeof rootReducer>;

// Configuration for Redux Persist
// Specifies what parts of the store should be persisted
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only cart data will be persisted
};

// Export the persisted reducer with a type cast through unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default persistReducer(persistConfig, rootReducer as any);
