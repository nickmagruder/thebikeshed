import { CartItem } from '../../types/redux.types';

/**
 * Adds an item to cart
 * If item already exists, increases quantity by 1
 * Otherwise adds new item with quantity of 1
 *
 * @param cartItems - Current cart items array
 * @param cartItemToAdd - Item to add to cart
 * @returns New array with updated cart items
 */
export const addItemToCart = (
  cartItems: CartItem[],
  cartItemToAdd: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

/**
 * Removes an item from cart
 * If quantity is 1, removes the item
 * Otherwise decreases quantity by 1
 *
 * @param cartItems - Current cart items array
 * @param cartItemToRemove - Item to remove from cart
 * @returns New array with updated cart items
 */
export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
