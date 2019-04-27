const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://vosmeeting.com/vosm_payment/charge'
  : 'https://vosmeeting.com/vosm_payment_test/charge';

export default PAYMENT_SERVER_URL;