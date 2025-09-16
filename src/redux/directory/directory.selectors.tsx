import { createSelector } from 'reselect';
import { RootState, Section } from '../../types/redux.types';

/**
 * Base selector for directory state
 */
const selectDirectory = (state: RootState) => state.directory;

/**
 * Selector to get directory sections
 */
export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory): Section[] => directory.sections
);
