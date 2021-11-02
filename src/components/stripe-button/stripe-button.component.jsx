/* import React from 'react';

const StripeCheckOutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JpfUGKJk1wg0EyFVMUtuMID9q12kg9bW4v1vdA1opeGXkZpXjVXdNpUMcU0ZsZR8ETU2HRsT6npRsPSrT2zUGgF00CyMjRrjA';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='NMagruder Ecommerce'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
} */