import React from "react";
import Navbar from "./../../../../components/shared/Navber";
import Footer from "./../../../../components/shared/footer";
import { useLocation } from "react-router-dom";

const Payments = () => {
  const location = useLocation();
  const { amount, title, description, id, price, totalPrice, productName } =
    location.state || {};
  console.log(totalPrice);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />

      {/* Main Payment Area */}
      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">
            Meal Plan Payment
          </h2>
          <p className="text-gray-700 mb-6">
            আপনার পছন্দের{" "}
            <span className="font-semibold text-orange-600">{title}</span>{" "}
            প্ল্যানের জন্য পেমেন্ট করুন নিচের ফর্ম ব্যবহার করে।
          </p>

          {/* Payment Details */}
          <div className="bg-orange-100 p-4 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-orange-700">
              প্যাকেজ বিবরণ
            </h3>

            <p>Product: {productName}</p>
            <p>Price: ${price}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Product ID: {id}</p>
          </div>

          {/* Stripe Payment Form / Placeholder */}
          <div className="border border-dashed border-orange-300 p-6 rounded-md text-center text-orange-500 bg-orange-50">
            {/* এখানে Stripe এর পেমেন্ট ফর্ম বা PaymentForm.jsx বসবে */}
            Stripe পেমেন্ট ফর্ম এখানে যুক্ত হবে
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payments;
