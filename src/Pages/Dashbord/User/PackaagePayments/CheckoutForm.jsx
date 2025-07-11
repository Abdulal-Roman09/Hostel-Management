import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "./../../../../Hooks/useAuth";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ amount }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth(); // <-- এখানে কল করবেন

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setError(null);
    setSuccess(null);
    setProcessing(true);

    try {
      const { data: clientSecretData } = await axiosSecure.post(
        "/create-payment-intent",
        { amount }
      );

      const clientSecret = clientSecretData.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
          setSuccess("Payment successful!");

          // Optional: Update user role here
          // await axiosSecure.patch(`/users/${user._id}/role`, { role: "premium" });

          setProcessing(false);
        }
      }
    } catch (error) {
      setError(error.message || "Payment failed");
      toast.error(error.message);
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left flex flex-col justify-items-center"
    >
      <CardElement className="border p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
