import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

import { RootState } from '../../types/redux.types';
import { Collection } from './shop.types';

/**
 * Base selector for shop state
 */
const selectShop = (state: RootState) => state.shop;

/**
 * Selector to get all collections
 */
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

/**
 * Memoized selector to get a specific collection by URL parameter
 *
 * @param collectionUrlParam - The collection name from URL
 * @returns A memoized selector to get the specific collection
 */
export const selectCollection = memoize((collectionUrlParam: string) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

/**
 * Selector to get collections as an array for preview
 */
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections): Collection[] =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
