"use client";
import { getUser } from "@/actions/user/getUser";
import PromptDetailsPage from "./_page"; // Ensure this is the correct import path for PromptDetailsPage
import { stripePublishableKey } from "@/actions/payment/paymentAction";

const Page = async ({ params }: { params: any }) => {
  // Fetch user and shop details
  const data = await getUser();

  // Get the Stripe publishable key from the backend
  const publishAbleKey = await stripePublishableKey() ?? ""; // Fallback to an empty string if undefined

  return (
    <div>
      <PromptDetailsPage
        user={data?.user}
        isSellerExist={!!data?.shop}
        publishAbleKey={publishAbleKey} // Ensure publishAbleKey is always a string
        promptId={params.id} // Pass the promptId to be used by PromptDetailsPage
      />
    </div>
  );
};

export default Page;
