import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description: description,
      stripeToken: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount),
      email: token.email
    })
    .then( response => {
      console.log('Response:')
      console.log(response)
    })
    .catch(error => {
      console.log('Error:')
      console.log(error)
    })

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;