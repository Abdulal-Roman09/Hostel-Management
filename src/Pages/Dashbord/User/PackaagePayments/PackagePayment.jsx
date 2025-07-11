import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./../../../../components/shared/Navber";
import Footer from "./../../../../components/shared/footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_publishable_key);

const PackagePayment = () => {
  const location = useLocation();
  const { amount, title, description } = location.state || {};

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />

      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center py-5 ">
            {title} Package Payment
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            আপনি "{title}" প্যাকেজের পেমেন্ট করতে যাচ্ছেন। নিচে বিস্তারিত তথ্য
            দেখুন এবং পেমেন্ট সম্পন্ন করুন।
          </p>

          <div className="mb-6 space-y-2">
            <p>
              <strong>Title:</strong> {title || "N/A"}
            </p>
            <p>
              <strong>Amount:</strong> ${amount || 0}
            </p>
            <p>
              <strong>Description:</strong> {description || "N/A"}
            </p>
          </div>

          <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={amount} title={title} />
            </Elements>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackagePayment;
