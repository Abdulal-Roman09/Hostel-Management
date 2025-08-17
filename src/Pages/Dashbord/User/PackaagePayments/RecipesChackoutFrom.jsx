import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "./../../../../Hooks/useAuth";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const RecipesChackoutFrom = ({
  id,
  price,
  totalPrice,
  productName,
  addedByName,
  addedByEmail,
}) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

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
        {
          amount: totalPrice,
          userId: user._id,
          userEmail: user.email,
          productId: id,
          productName,
          sellerEmail: addedByEmail,
        }
      );
      const clientSecret = clientSecretData.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email: user.email },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        setSuccess("Payment successful!");

        const recipesInfo = {
          buyer: {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
          },
          recipe: {
            id: id,
            title: productName,
            price: price,
            totalPrice: totalPrice,
          },
          transaction: {
            id: paymentResult.paymentIntent.id,
            date: new Date().toISOString(),
            status: "pending",
          },
          seller: {
            name: addedByName || "N/A",
            email: addedByEmail || "N/A",
          },
        };
        await axiosSecure.post(`/myPayments`, recipesInfo);
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
      className="space-y-4 flex flex-col w-full max-w-md mx-auto
                 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md
                 transition-colors duration-300"
    >
      <CardElement
        options={{
          style: {
            base: {
              color: "#000",
              "::placeholder": { color: "#888" },
              backgroundColor: "#fff",
            },
            invalid: { color: "#f87171" },
          },
        }}
        className="border p-2 rounded-md bg-white dark:bg-gray-700"
      />

      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500
                   text-white px-4 py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Processing..." : `Pay $${totalPrice}`}
      </button>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      {success && <p className="text-green-600 dark:text-green-400">{success}</p>}
    </form>
  );
};

export default RecipesChackoutFrom;
