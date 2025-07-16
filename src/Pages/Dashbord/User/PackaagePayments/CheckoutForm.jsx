import React, { use, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "./../../../../Hooks/useAuth";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const CheckoutForm = ({ amount, title }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  // Role + Package update mutation
  const rolePackageUpdateMutation = useMutation({
    mutationFn: async ({ role, packages }) => {
      const res = await axiosSecure.patch(`users/${user?.email}/role-package`, {
        newRole: role,
        newPackage: packages,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Role & package updated!");
    },
    onError: (error) => {
      toast.error("Update failed: " + error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError(null);
    setSuccess(null);
    setProcessing(true);

    try {
      // Step 1: Create payment intent
      const { data: clientSecretData } = await axiosSecure.post(
        "/create-payment-intent",
        {
          amount, 
          userEmail: user?.email,
          userName: user?.displayName,
          package: title,
        }
      );
      const clientSecret = clientSecretData.clientSecret;
      const cardElement = elements.getElement(CardElement);

      // Step 2: Confirm card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email: user.email },
        },
      });

      // Step 3: Handle result
      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        setSuccess("Payment successful!");

        // Step 4: Update role and packages
        rolePackageUpdateMutation.mutate({
          role: "subscriber",
          packages: title, // example: 'Bronze', 'Gold'
        });
        navigate("/allMeals");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col w-full max-w-md mx-auto"
    >
      <CardElement className="border p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
