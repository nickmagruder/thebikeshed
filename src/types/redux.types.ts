import { store } from '../redux/store';

/**
 * RootState type - inferred from the store
 * Use this for typed Redux selectors
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type - inferred from the store
 * Use this for typed dispatch actions
 */
export type AppDispatch = typeof store.dispatch;

/**
 * User type from Firebase user object
 */
export interface User {
  id: string;
  displayName?: string;
  email: string;
  createdAt: Date;
  [key: string]: any; // For additional properties that may come from Firebase
}

/**
 * User action types
 */
export enum UserActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

/**
 * User action type
 */
export interface SetCurrentUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
  payload: User | null;
}
