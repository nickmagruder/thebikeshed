import React, { FC } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';

// Props interface for the StripeCheckoutButton component
interface StripeCheckoutButtonProps {
  price: number;
}

// StripeCheckoutButton component - Handles Stripe payment processing
// Takes a price prop and sets up a Stripe checkout session
const StripeCheckOutButton: FC<StripeCheckoutButtonProps> = ({ price }) => {
  // Stripe requires the price in cents
  const priceForStripe = price * 100;
  // Publishable API key from Stripe dashboard
  const publishableKey =
    'pk_test_51JpfUGKJk1wg0EyFVMUtuMID9q12kg9bW4v1vdA1opeGXkZpXjVXdNpUMcU0ZsZR8ETU2HRsT6npRsPSrT2zUGgF00CyMjRrjA';

  // Callback function executed when payment is successful
  const onToken = (token: Token) => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="NMagruder Ecommerce"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckOutButton;
