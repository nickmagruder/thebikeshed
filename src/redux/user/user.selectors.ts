import { createSelector } from 'reselect';
import { RootState } from '../../types/redux.types';

// Base selector to get the user slice of state
const selectUser = (state: RootState) => state.user;

// Selector to get the current user from state
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
