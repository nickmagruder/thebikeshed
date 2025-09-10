/**
 * Checkout Page Component
 *
 * This component renders the checkout page where users can review their cart items,
 * see the total price, and modify quantities or remove items.
 *
 * The component connects to Redux store to access cart items and total price.
 */
import React from 'react';
import { connect } from 'react-redux'; // For connecting component to Redux store
import { createStructuredSelector } from 'reselect'; // Utility for creating structured selectors

// Selectors to get cart items and total price from Redux store
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

// Component that renders individual items in the checkout page
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

// Styles for the checkout page
import './checkout.styles.scss';

/**
 * CheckoutPage component
 * @param {Array} cartItems - Array of items in the cart
 * @param {number} total - Total price of all items in the cart
 * @returns {JSX.Element} - Rendered checkout page
 */
const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    {/* Header row with column labels */}
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {/* Map through cart items and render a CheckoutItem component for each */}
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    {/* Display the total price of all items */}
    <span className="total">TOTAL: ${total}</span>
  </div>
);

/**
 * mapStateToProps function
 *
 * Uses createStructuredSelector to select multiple pieces of state from Redux store:
 * - cartItems: All items currently in the cart
 * - total: The total price of all items in the cart
 */
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

// Connect the CheckoutPage component to Redux store
export default connect(mapStateToProps)(CheckoutPage);
