import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import { RootState } from '../types/redux.types';

/**
 * Array of Redux middleware to be applied to the store
 * Conditionally adds logger middleware in development environment
 */
const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

/**
 * The Redux store instance
 * Configured with middleware and our combined root reducer
 */
export const store: Store<RootState> = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

/**
 * Persistor for Redux Persist
 * Enables state persistence across app refreshes
 */
export const persistor: Persistor = persistStore(store);
