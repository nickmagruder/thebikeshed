import { User } from '../../types/redux.types';

// User action type constants
export enum UserActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

// User action type
export interface SetCurrentUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
  payload: User | null;
}

// Union type for all user actions
export type UserActionType = SetCurrentUserAction;

// User state interface
export interface UserState {
  readonly currentUser: User | null;
}
