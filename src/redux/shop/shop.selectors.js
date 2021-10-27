import { createSelector } from 'reselect';

const selectShop = state => state.shop;

console.log(selectShop, 'SELECT SHOP');

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);
