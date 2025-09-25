import { DirectoryState } from '../../types/redux.types';
import { Action } from 'redux';

// Initial state for directory
// Contains predefined directory sections
const INITIAL_STATE: DirectoryState = {
  sections: [
    {
      title: 'bags',
      imageUrl: '/images/bags.png',
      id: 1,
      linkUrl: 'shop/bags',
    },
    {
      title: 'apparel',
      imageUrl: '/images/apparel.jpg',
      id: 2,
      linkUrl: 'shop/apparel',
    },
    {
      title: 'accessories',
      imageUrl: '/images/accessories.png',
      id: 3,
      linkUrl: 'shop/accessories',
    },
    {
      title: 'city',
      imageUrl: '/images/city.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/city',
    },
    {
      title: 'adventure',
      imageUrl: '/images/adventure.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/adventure',
    },
  ],
};

// Directory reducer - currently only returns state as no actions modify it
// @param state - Current directory state
// @param action - Action dispatched
// @returns Directory state

const directoryReducer = (
  state = INITIAL_STATE,
  action: Action
): DirectoryState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
