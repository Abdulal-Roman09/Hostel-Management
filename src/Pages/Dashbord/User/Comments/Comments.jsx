import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";
import { toast } from "react-toastify";

const ReviewsSection = ({ mealId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewText, setReviewText] = useState("");

  // Fetch reviews for this meal
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${mealId}/comments`);
      console.log("Fetched reviews:", res.data);
      return res.data.comments || [];
    },
    enabled: !!mealId,
  });

  // Mutation to add review (two POSTs simultaneously)
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      console.log("Posting review data:", newReview);
      const [res1, res2] = await Promise.all([
        axiosSecure.post(`/foods/${mealId}/comments`, newReview),
        axiosSecure.post(`/reviews`, newReview),
      ]);
      console.log("/foods response:", res1.data);
      console.log("/reviews response:", res2.data);
      return { res1: res1.data, res2: res2.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", mealId]);
      setReviewText("");
      toast.success("✅ Review posted successfully!");
    },
    onError: (error) => {
      console.error(
        "Error posting review:",
        error.response?.data || error.message
      );
      toast.error("❌ Review post Error!");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      mealId: mealId,
      text: reviewText.trim(),
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "",
      userPhoto: user?.photoURL,
      createdAt: new Date().toISOString(),
    };

    addReviewMutation.mutate(newReview);
  };

  return (
    <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg p-6 shadow max-w-4xl mx-auto transition-colors duration-300">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          rows={3}
          className="w-full border rounded p-3 resize-none focus:outline-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-300"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={addReviewMutation.isLoading}
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          {addReviewMutation.isLoading ? "Posting..." : "Post Review"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-orange-400 text-center">
        Reviews : {reviews.length}
      </h3>

      {isLoading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading reviews...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load reviews.</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review._id || review.createdAt}
              className="border rounded p-4 bg-orange-50 dark:bg-gray-700 transition-colors duration-300"
            >
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {review.userName || "Anonymous"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-800 dark:text-gray-100">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsSection;
