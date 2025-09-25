import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './menu-item.styles.scss';

// Props interface for the MenuItem component
interface MenuItemProps {
  title: string;
  imageUrl: string;
  size: string;
  linkUrl: string;
}

// MenuItem component - displays a category tile on the homepage
// with background image and navigation functionality
const MenuItem: FC<MenuItemProps> = ({ title, imageUrl, size, linkUrl }) => {
  // Use React Router hooks for navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => navigate(`${location.pathname}${linkUrl}`)}
    >
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;