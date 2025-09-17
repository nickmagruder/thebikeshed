import { UserState } from '../../types/redux.types';
import { UserActionTypes, UserActionType } from './user.types';

// Initial state for the user reducer
const INITIAL_STATE: UserState = {
  currentUser: null,
};

// User reducer handles user-related state changes
const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserActionType
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
