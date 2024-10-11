"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Send Stripe publishable key (safe for the frontend)
export const stripePublishableKey = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return publishableKey; // Safe to expose to the client
};

// Send Stripe payment intent and return client secret
export const stripePaymentIntent = async ({ amount }: { amount: number }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Ensure this is in the smallest currency unit (e.g., cents for USD)
      currency: "USD",
      metadata: {
        company: "Promptify",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret; // Return only client_secret
  } catch (error) {
    console.log(error);
  }
};
