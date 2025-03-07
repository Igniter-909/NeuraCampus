import { Subscription } from '../models/Subscription.js';
import { SubscriptionPlan } from '../models/SubscriptionPlan.js';
import { RecruiterProfile } from '../models/RecruiterProfile.js';
import { createOrder, verifyPayment, getPaymentDetails } from '../utils/razorpay.js';
import logger from '../utils/logger.js';

export const createSubscriptionOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;

    // Get subscription plan details
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    // Create a unique receipt ID
    const receipt = `sub_${userId}_${Date.now()}`;

    // Create order in Razorpay
    const order = await createOrder(
      plan.price,
      'INR',
      receipt,
      {
        userId: userId.toString(),
        planId: planId,
        planName: plan.name
      }
    );

    res.status(200).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        amount: order.amount / 100, // Convert back to rupees
        currency: order.currency,
        receipt: order.receipt
      },
      plan: {
        name: plan.name,
        duration: plan.duration,
        features: plan.features
      }
    });
  } catch (error) {
    logger.error('Error creating subscription order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

export const verifySubscriptionPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      planId
    } = req.body;
    
    const userId = req.user._id;

    // Verify payment signature
    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Get payment details
    const paymentDetails = await getPaymentDetails(razorpay_payment_id);
    
    // Get plan details
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    // Calculate expiry date
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    // Create new subscription
    const subscription = await Subscription.create({
      recruiterId: userId,
      planId: plan._id,
      planName: plan.name,
      status: 'active',
      startDate,
      expiryDate,
      duration: plan.duration,
      features: {
        jobPostsLimit: plan.features.jobPostsLimit,
        jobPostsRemaining: plan.features.jobPostsLimit,
        featuredPostsLimit: plan.features.featuredPostsLimit,
        featuredPostsRemaining: plan.features.featuredPostsLimit,
        candidateContactsLimit: plan.features.candidateContactsLimit,
        candidateContactsRemaining: plan.features.candidateContactsLimit,
        resumeDownloadsLimit: plan.features.resumeDownloadsLimit,
        resumeDownloadsRemaining: plan.features.resumeDownloadsLimit,
        canPostInternships: plan.features.canPostInternships,
        canPostJobs: plan.features.canPostJobs,
        advancedAnalytics: plan.features.advancedAnalytics,
        prioritySupport: plan.features.prioritySupport
      },
      payment: {
        amount: paymentDetails.amount / 100, // Convert from paise to rupees
        currency: paymentDetails.currency,
        transactionId: paymentDetails.id,
        paymentMethod: 'razorpay',
        status: 'completed',
        paidAt: new Date(),
        metadata: {
          gateway: 'razorpay',
          gatewayTransactionId: paymentDetails.id,
          paymentResponse: paymentDetails
        }
      }
    });

    // Update recruiter profile
    await RecruiterProfile.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          subscriptionStatus: 'active',
          currentSubscription: subscription._id
        }
      }
    );

    logger.info(`Subscription payment verified and activated: ${userId}, Plan: ${plan.name}`);
    res.status(200).json({
      message: 'Payment verified and subscription activated',
      subscription: {
        id: subscription._id,
        plan: plan.name,
        status: 'active',
        startDate,
        expiryDate,
        features: subscription.features
      }
    });
  } catch (error) {
    logger.error('Error verifying subscription payment:', error);
    res.status(500).json({ message: 'Failed to verify payment', error: error.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get all subscriptions with payment details
    const subscriptions = await Subscription.find({
      recruiterId: userId
    }).sort({ 'payment.paidAt': -1 });

    const paymentHistory = subscriptions.map(sub => ({
      subscriptionId: sub._id,
      planName: sub.planName,
      amount: sub.payment.amount,
      currency: sub.payment.currency,
      transactionId: sub.payment.transactionId,
      status: sub.payment.status,
      paidAt: sub.payment.paidAt,
      startDate: sub.startDate,
      expiryDate: sub.expiryDate
    }));

    res.status(200).json({
      paymentHistory
    });
  } catch (error) {
    logger.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Failed to fetch payment history', error: error.message });
  }
}; 