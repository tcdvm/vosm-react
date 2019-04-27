const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_rNrIXxEyBd9tpTLxTw0P4iiA'
  : 'pk_test_loAPqOiMFuxDx3my2xE3b40D';

export default STRIPE_PUBLISHABLE;