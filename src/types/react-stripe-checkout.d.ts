declare module 'react-stripe-checkout' {
  import React from 'react';

  export interface Token {
    id: string;
    email: string;
    [key: string]: unknown;
  }

  export interface StripeCheckoutProps {
    token: (token: Token) => void;
    stripeKey: string;
    name?: string;
    description?: string;
    image?: string;
    amount?: number;
    currency?: string;
    panelLabel?: string;
    label?: string;
    zipCode?: boolean;
    billingAddress?: boolean;
    shippingAddress?: boolean;
    [key: string]: unknown;
  }

  export default class StripeCheckout extends React.Component<
    StripeCheckoutProps,
    Record<string, never>
  > {}
}
