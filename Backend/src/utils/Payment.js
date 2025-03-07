import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (paymentDetails) => {
    try {
        const { amount, token, currency = 'inr' } = paymentDetails;

        const charge = await stripe.charges.create({
            amount: amount * 100, // Convert to smallest currency unit
            currency,
            source: token,
            description: 'Recruiter subscription payment'
        });

        return {
            success: true,
            amount,
            transactionId: charge.id,
            receipt: charge.receipt_url
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const createRefund = async (chargeId) => {
    try {
        const refund = await stripe.refunds.create({
            charge: chargeId
        });

        return {
            success: true,
            refundId: refund.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}; 