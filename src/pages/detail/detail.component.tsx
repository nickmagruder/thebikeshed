import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CustomButton from '../../components/custom-button/custom-button.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { addItem } from '../../redux/cart/cart.actions';
import { useAppDispatch } from '../../types/hooks';
import { CollectionItem, Collection } from '../../redux/shop/shop.types';
import { CartItem } from '../../types/redux.types';

import './detail.styles.scss';

const DetailPage: FC = () => {
  const { collectionId, itemId } = useParams<{ collectionId: string; itemId: string }>();
  const dispatch = useAppDispatch();
  
  // Get the collection from Redux store
  const collection: Collection | null = useSelector(selectCollection(collectionId!));
  
  // Find the specific item in the collection
  const item = collection?.items?.find((item: CollectionItem) => item.id === parseInt(itemId!));

  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleAddToCart = () => {
    if (item) {
      // Cast CollectionItem to CartItem - the cart utilities will handle adding quantity
      dispatch(addItem(item as CartItem));
    }
  };

  if (!item) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <h2>Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Product Image */}
        <div className="product-image-container">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="product-image"
          />
        </div>

        {/* Product Information */}
        <div className="product-info">
          <h1 className="product-name">{item.name}</h1>
          
          <div className="product-price">
            ${item.price}
          </div>

          <div className="product-description">
            <p>
              Premium quality {item.name.toLowerCase()} crafted with attention to detail. 
              Perfect for any occasion, this piece combines style and comfort to create 
              a timeless addition to your wardrobe.
            </p>
            <ul className="product-features">
              <li>High-quality materials</li>
              <li>Comfortable fit</li>
              <li>Durable construction</li>
              <li>Easy care instructions</li>
            </ul>
          </div>

          {/* Size Selection (for clothing items) */}
          {(collectionId === 'mens' || collectionId === 'womens') && (
            <div className="size-selector">
              <h3>Select Size:</h3>
              <div className="size-options">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="add-to-cart-container">
            <CustomButton onClick={handleAddToCart}>
              Add to Cart
            </CustomButton>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h3>Product Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{collectionId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Item ID:</span>
                <span className="detail-value">#{item.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Availability:</span>
                <span className="detail-value">In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;