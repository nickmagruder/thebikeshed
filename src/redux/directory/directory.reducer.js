const INITIAL_STATE = {
  sections: [
    {
      title: 'bags',
      imageUrl: 'images/bags.png',
      id: 1,
      linkUrl: 'shop/bags'

    },
    {
      title: 'apparel',
      imageUrl: 'images/apparel.png',
      id: 2,
      linkUrl: 'shop/apparel'
    },
    {
      title: 'accessories',
      imageUrl: 'images/accessories.png',
      id: 3,
      linkUrl: 'shop/accessories'
    },
    {
      title: 'city bikes',
      imageUrl: 'images/city.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/city'
    },
    {
      title: 'adventure bikes',
      imageUrl: 'images/adventure.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/adventure'
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
