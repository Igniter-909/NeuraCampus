import Razorpay from 'razorpay';
import crypto from 'crypto';
import logger from './logger.js';

// Initialize Razorpay with your key credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new order
export const createOrder = async (amount, currency = 'INR', receipt, notes = {}) => {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      notes
    };

    const order = await razorpay.orders.create(options);
    logger.info(`Razorpay order created: ${order.id}`);
    return order;
  } catch (error) {
    logger.error('Error creating Razorpay order:', error);
    throw new Error(`Failed to create payment order: ${error.message}`);
  }
};

// Verify payment signature
export const verifyPayment = (orderId, paymentId, signature) => {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = generatedSignature === signature;
    
    if (isValid) {
      logger.info(`Payment verified successfully: ${paymentId}`);
    } else {
      logger.warn(`Invalid payment signature: ${paymentId}`);
    }
    
    return isValid;
  } catch (error) {
    logger.error('Error verifying payment:', error);
    throw new Error(`Failed to verify payment: ${error.message}`);
  }
};

// Fetch payment details
export const getPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    logger.info(`Fetched payment details: ${paymentId}`);
    return payment;
  } catch (error) {
    logger.error(`Error fetching payment details: ${paymentId}`, error);
    throw new Error(`Failed to fetch payment details: ${error.message}`);
  }
};

// Refund payment
export const refundPayment = async (paymentId, amount = null) => {
  try {
    const options = {};
    if (amount) {
      options.amount = amount * 100; // Convert to paise
    }

    const refund = await razorpay.payments.refund(paymentId, options);
    logger.info(`Payment refunded: ${paymentId}, refund ID: ${refund.id}`);
    return refund;
  } catch (error) {
    logger.error(`Error refunding payment: ${paymentId}`, error);
    throw new Error(`Failed to refund payment: ${error.message}`);
  }
};

// Capture payment
export const capturePayment = async (paymentId, amount, currency = 'INR') => {
  try {
    const payment = await razorpay.payments.capture(paymentId, amount * 100, currency);
    logger.info(`Payment captured: ${paymentId}`);
    return payment;
  } catch (error) {
    logger.error(`Error capturing payment: ${paymentId}`, error);
    throw new Error(`Failed to capture payment: ${error.message}`);
  }
}; 