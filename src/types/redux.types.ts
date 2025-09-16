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
  collections: any;
}

// Combined root state type
export interface RootState {
  user: UserState;
  cart: CartState;
  directory: DirectoryState;
  shop: ShopState;
}

/**
 * AppDispatch type - for typed dispatch functions
 */
export type AppDispatch = (action: any) => any;

/**
 * Cart item interface
 */
export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

/**
 * Directory section interface
 */
export interface Section {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
  size?: string;
}

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
