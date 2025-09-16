import {
  ShopActionType,
  CollectionsMap,
  UpdateCollectionsAction,
} from './shop.types';

/**
 * Action creator to update collections
 *
 * @param collectionsMap - Map of collection items keyed by collection name
 * @returns Action object with type and payload
 */
export const updateCollections = (
  collectionsMap: CollectionsMap
): UpdateCollectionsAction => ({
  type: ShopActionType.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
