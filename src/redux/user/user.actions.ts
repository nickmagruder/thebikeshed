import { User } from '../../types/redux.types';
import { UserActionTypes, SetCurrentUserAction } from './user.types';

// Action creator for setting the current user
export const setCurrentUser = (user: User | null): SetCurrentUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
