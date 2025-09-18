// Import from redux-persist
import { PersistPartial } from 'redux-persist/es/persistReducer';
// Import shop types
import { CollectionsMap } from '../redux/shop/shop.types';

// User type from Firebase user object
export interface User {
  id: string;
  displayName?: string;
  email: string;
  createdAt: Date;
  [key: string]: unknown; // For additional properties that may come from Firebase
}

// Cart item interface
export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

// Directory section interface
export interface Section {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
  size?: string;
}

// State types for each reducer
export interface UserState {
  currentUser: User | null;
}

export interface CartState {
  hidden: boolean;
  cartItems: CartItem[];
}

export interface DirectoryState {
  sections: Section[];
}

export interface ShopState {
  collections: CollectionsMap | null;
}

// Combined root state type
export interface RootState {
  user: UserState;
  cart: CartState;
  directory: DirectoryState;
  shop: ShopState;
}

// Root state with persist partial for store.getState()
export type PersistedRootState = RootState & PersistPartial;

// User action types
export enum UserActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

// User action type
export interface SetCurrentUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
  payload: User | null;
}
