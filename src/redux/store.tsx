import { configureStore } from '@reduxjs/toolkit';
import { persistStore, Persistor } from 'redux-persist';
import logger from 'redux-logger';
import { PersistedRootState } from '../types/redux.types';

import rootReducer from './root-reducer';

// The Redux store instance
// Configured with middleware and our combined root reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for non-serializable values in redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      }
    });

    // Conditionally add logger middleware in development environment
    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }

    return middleware;
  }
});

// Persistor for Redux Persist
// Enables state persistence across app refreshes
export const persistor: Persistor = persistStore(store);

// Export store type for typed dispatch functions
export type AppStore = typeof store;

// Export typed dispatch function
export type AppDispatch = typeof store.dispatch;

// Export the type-safe getState function
export const getTypedState = () => store.getState() as PersistedRootState;
