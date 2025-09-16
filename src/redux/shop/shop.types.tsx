/**
 * Enum for Shop action type constants
 * Using enum for better type safety and IDE support
 */
export enum ShopActionType {
  UPDATE_COLLECTIONS = 'UPDATE_COLLECTIONS',
}

/**
 * Collection item interface - represents a shop collection item
 */
export interface CollectionItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

/**
 * Collection interface - represents a shop collection
 */
export interface Collection {
  id: number;
  title: string;
  routeName: string;
  items: CollectionItem[];
}

/**
 * Collections dictionary type - collection items indexed by string keys
 */
export type CollectionsMap = {
  [key: string]: Collection;
};

/**
 * Shop action interface for updating collections
 */
export interface UpdateCollectionsAction {
  type: ShopActionType.UPDATE_COLLECTIONS;
  payload: CollectionsMap;
}

/**
 * Union type of all shop actions
 */
export type ShopAction = UpdateCollectionsAction;
