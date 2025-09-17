import { createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { PersistedRootState } from '../types/redux.types';

import rootReducer from './root-reducer';

// Array of Redux middleware to be applied to the store
// Conditionally adds logger middleware in development environment
const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// The Redux store instance
// Configured with middleware and our combined root reducer
export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

// Persistor for Redux Persist
// Enables state persistence across app refreshes
export const persistor: Persistor = persistStore(store);

// Export store type for typed dispatch functions
export type AppStore = typeof store;

// Export the type-safe getState function
export const getTypedState = () => store.getState() as PersistedRootState;
